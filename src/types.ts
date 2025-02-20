export interface Options {
  category: WeirdGlyphCategory
  variant: WeirdGlyphVariant
}

/**
 * Weird glyphs
 *
 * An array of 62 strings, includes:
 *
 * - A-Z in uppercase
 * - a-z in lowercase
 * - 0-9
 */
export type WeirdGlyphs = string[]

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

/**
 * Weird glyph data
 */
export type WeirdGlyphData = {
  circle: {
    black: WeirdGlyphs
    regular: WeirdGlyphs
  }
  currency: {
    regular: WeirdGlyphs
  }
  'double-struck': {
    bold: WeirdGlyphs
  }
  fancy: {
    happy: WeirdGlyphs
    sad: WeirdGlyphs
    smallcaps: WeirdGlyphs
    tildestrikethrough: WeirdGlyphs
    upside: WeirdGlyphs
    xabove: WeirdGlyphs
  }
  fraktur: {
    bold: WeirdGlyphs
    regular: WeirdGlyphs
  }
  latin: {
    arrow: WeirdGlyphs
    cross: WeirdGlyphs
    dot: WeirdGlyphs
    extended: WeirdGlyphs
    fireworks: WeirdGlyphs
    line: WeirdGlyphs
    slash: WeirdGlyphs
    winding: WeirdGlyphs
  }
  monospace: {
    regular: WeirdGlyphs
  }
  'sans-serif': {
    bold: WeirdGlyphs
    'bold-italic': WeirdGlyphs
    italic: WeirdGlyphs
    regular: WeirdGlyphs
  }
  script: {
    bold: WeirdGlyphs
    regular: WeirdGlyphs
  }
  serif: {
    bold: WeirdGlyphs
    'bold-italic': WeirdGlyphs
    italic: WeirdGlyphs
    regular: WeirdGlyphs
  }
  square: {
    black: WeirdGlyphs
    regular: WeirdGlyphs
  }
}
