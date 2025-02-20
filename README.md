# weird-glyph

[![CI](https://github.com/ntnyq/weird-glyph/workflows/CI/badge.svg)](https://github.com/ntnyq/weird-glyph/actions)
[![NPM VERSION](https://img.shields.io/npm/v/weird-glyph.svg)](https://www.npmjs.com/package/weird-glyph)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/weird-glyph.svg)](https://www.npmjs.com/package/weird-glyph)
[![LICENSE](https://img.shields.io/github/license/ntnyq/weird-glyph.svg)](https://github.com/ntnyq/weird-glyph/blob/main/LICENSE)

## Install

```shell
npm i weird-glyph -D
```

```shell
yarn add weird-glyph -D
```

```shell
pnpm add weird-glyph -D
```

## Usage

```ts
// config/index.ts

import { weirdGlyph } from 'weird-glyph'

console.log(
  weirdGlyph('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', {
    category: 'script',
    variant: 'regular',
  }),
)
// cSpell: disable-next-line
// => 𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏
```

## API

### weirdGlyph

- **Type**: `(input: string, options: Options) => string`

## Interface

```ts
export type Options = {
  category: WeirdGlyphCategory
  variant: WeirdGlyphVariant
}

/**
 * Weird glyph category
 */
export type WeirdGlyphCategory =
  | 'circle'
  | 'currency'
  | 'double-struck'
  | 'fancy'
  | 'fraktur'
  | 'latin'
  | 'monospace'
  | 'sans-serif'
  | 'script'
  | 'serif'
  | 'square'

/**
 * Weird glyph variant
 */
export type WeirdGlyphVariant =
  | 'arrow'
  | 'black'
  | 'bold-italic'
  | 'bold'
  | 'cross'
  | 'dot'
  | 'extended'
  | 'fireworks'
  | 'happy'
  | 'italic'
  | 'line'
  | 'regular'
  | 'sad'
  | 'slash'
  | 'smallcaps'
  | 'tildestrikethrough'
  | 'upside'
  | 'winding'
  | 'xabove'
```

## License

[MIT](./LICENSE) License © 2025-PRESENT [ntnyq](https://github.com/ntnyq)
