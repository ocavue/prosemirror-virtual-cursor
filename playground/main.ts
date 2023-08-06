import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-menu/style/menu.css';
import 'prosemirror-example-setup/style/style.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import 'prosemirror-virtual-cursor/style/virtual-cursor.css';

import './style.css';

import { exampleSetup } from 'prosemirror-example-setup';
import { DOMParser, Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { createVirtualCursor } from '../src/index';

const { marks, nodes } = schema.spec;

marks.forEach((_key, value) => {
  if (value.inclusive === false) {
    value.inclusive = true;
  }
});

const demoSchema = new Schema({
  nodes: addListNodes(nodes, 'paragraph block*', 'block'),
  marks,
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

new EditorView(document.querySelector('.full'), { state });
