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
import 'prosemirror-virtual-cursor/style/virtual-cursor.css';

import { createVirtualCursor } from 'prosemirror-virtual-cursor';

const plugin = createVirtualCursor();
```

## Options

### Cursor color

The default color of the cursor is red. You can change it by overriding the CSS variable `--prosemirror-virtual-cursor-color`. You can also copy all the CSS rules from `style/virtual-cursor.css` to your own stylesheet and change more things.

### `skipWarning`

By default, prosemirror-virtual-cursor will warn you if any mark has [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) set to `false`, as `inclusive` is not useful for prosemirror-virtual-cursor. You can disable this warning by setting `skipWarning` to `true`. You can also specify an array of mark names to skip the warning for specific marks.

```ts
const plugin = createVirtualCursor({ skipWarning: true });
```

```ts
const plugin = createVirtualCursor({ skipWarning: ['mark_type_name'] });
```

## License

MIT
