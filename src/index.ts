import type { ResolvedPos } from 'prosemirror-model'
import { Mark } from 'prosemirror-model'
import type { Selection } from 'prosemirror-state'
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export function createVirtualCursor(): Plugin {
  const key = new PluginKey('prosemirror-virtual-cursor')

  return new Plugin({
    key,
    props: {
      handleKeyDown: (view, event): boolean => {
        const { selection } = view.state

        if (
          event.altKey
          || event.ctrlKey
          || event.metaKey
          || event.shiftKey
          || event.isComposing
          || !['ArrowLeft', 'ArrowRight'].includes(event.key)
          || !isTextSelection(selection)
          || !selection.$cursor
        )
          return false

        const $pos = selection.$head
        const [marksBefore, marksAfter] = getMarksAround($pos)
        const marks = view.state.storedMarks || $pos.marks()

        // Don't move the cursor, only change the stored marks
        if (
          marksBefore
          && marksAfter
          && !Mark.sameSet(marksBefore, marksAfter)
        ) {
          if (event.key === 'ArrowLeft' && !Mark.sameSet(marksBefore, marks)) {
            view.dispatch(view.state.tr.setStoredMarks(marksBefore))
            return true
          }

          if (event.key === 'ArrowRight' && !Mark.sameSet(marksAfter, marks)) {
            view.dispatch(view.state.tr.setStoredMarks(marksAfter))

            return true
          }
        }

        // Move the cursor and also change the stored marks
        if (event.key === 'ArrowLeft' && $pos.textOffset === 1) {
          view.dispatch(
            view.state.tr
              .setSelection(TextSelection.create(view.state.doc, $pos.pos - 1))
              .setStoredMarks($pos.marks()),
          )
          return true
        }
        if (
          event.key === 'ArrowRight'
          && $pos.textOffset + 1 === $pos.parent.maybeChild($pos.index())?.nodeSize
        ) {
          view.dispatch(
            view.state.tr
              .setSelection(TextSelection.create(view.state.doc, $pos.pos + 1))
              .setStoredMarks($pos.marks()),
          )
          return true
        }

        return false
      },
      decorations: (state) => {
        const { selection, doc } = state

        if (!isTextSelection(selection))
          return null

        let className = 'prosemirror-virtual-cursor'
        let side = 20

        const $pos = state.selection.$head
        const [marksBefore, marksAfter] = getMarksAround($pos)
        const marks = state.storedMarks || $pos.marks()

        if (
          selection.$cursor
          && marksBefore
          && marksAfter
          && marks
          && !Mark.sameSet(marksBefore, marksAfter)
        ) {
          if (Mark.sameSet(marksBefore, marks)) {
            className += ' prosemirror-virtual-cursor-left'
          }
          else if (Mark.sameSet(marksAfter, marks)) {
            className += ' prosemirror-virtual-cursor-right'
            side = -20
          }
        }

        const deco = Decoration.widget(
          $pos.pos,
          () => createCursor(className),
          { side },
        )
        return DecorationSet.create(doc, [deco])
      },
    },
  })
}

function createCursor(className: string) {
  const span = document.createElement('span')
  span.className = className
  span.textContent = '\u200B' /* ZERO_WIDTH_SPACE */
  return span
}

function getMarksAround($pos: ResolvedPos) {
  const index = $pos.index()
  const after = $pos.parent.maybeChild(index)

  // When inside a text node, just return the text node's marks
  let before = $pos.textOffset ? after : null

  if (!before && index > 0)
    before = $pos.parent.maybeChild(index - 1)

  return [before?.marks, after?.marks] as const
}

function isTextSelection(selection: Selection): selection is TextSelection {
  return selection && typeof selection === 'object' && '$cursor' in selection
}
