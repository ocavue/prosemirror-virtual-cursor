# prosemirror-virtual-cursor

[![NPM version](https://img.shields.io/npm/v/prosemirror-virtual-cursor?color=a1b858&label=)](https://www.npmjs.com/package/prosemirror-virtual-cursor)

This is a plugin that adds a virtual cursor (or caret) to your editor. It implements the [bike-style cursor](https://www.hogbaysoftware.com/posts/bike-rich-text/), which shows a tail under the cursor between mark boundary.

## [Online Demo](https://prosemirror-virtual-cursor.vercel.app/)

## Install

```bash
npm install prosemirror-virtual-cursor
```

## Usage 

```ts
import 'prosemirror-virtual-cursor/style/virtual-cursor.css'

import { createVirtualCursor } from 'prosemirror-virtual-cursor'

const plugin = createVirtualCursor()
```

## License

MIT
