# prosemirror-virtual-cursor

[![NPM version](https://img.shields.io/npm/v/prosemirror-virtual-cursor?color=a1b858&label=)](https://www.npmjs.com/package/prosemirror-virtual-cursor)

This is a plugin that adds a virtual cursor (or caret) to your editor. It implements [Bike’s typing affinity caret](https://www.hogbaysoftware.com/posts/bike-rich-text/), which shows a tail under the cursor between mark boundary.

https://user-images.githubusercontent.com/24715727/202461170-6df71a46-f0a5-492a-a61c-3db765dde389.mp4

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

The default color of the cursor is red. You can change it by overriding the CSS variable `--prosemirror-virtual-cursor-color`. You can also copy all the CSS rules from `style/virtual-cursor.css` to your own stylesheet and change more things.

## License

MIT
