import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-menu/style/menu.css';
import 'prosemirror-example-setup/style/style.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import 'prosemirror-virtual-cursor/style/virtual-cursor.css';

import './style.css';

import { DOMParser, Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';

import { createVirtualCursor } from '../src/index';

const demoSchema = new Schema({
  nodes: addListNodes(schema.spec.nodes as any, 'paragraph block*', 'block'),
  marks: schema.spec.marks,
});

const plugins = [
  ...exampleSetup({ schema: demoSchema }),
  createVirtualCursor(),
];

const contentElement = document.querySelector('#content');
if (!contentElement) {
  throw new Error("failed to find '#content'");
}

const state = EditorState.create({
  doc: DOMParser.fromSchema(demoSchema).parse(contentElement),
  plugins,
});

(window as any).view = new EditorView(document.querySelector('.full'), {
  state,
});
