import { weirdGlyphData } from 'weird-glyph'
import type {
  Options,
  WeirdGlyphCategory,
  WeirdGlyphVariant,
} from 'weird-glyph'

export type GlyphFamily = 'type' | 'shapes' | 'playful'

interface GlyphCategory {
  category: WeirdGlyphCategory
  name: string
  family: GlyphFamily
}

interface GlyphStyle extends Options {
  id: string
  name: string
  variantName: string
  family: GlyphFamily
}

export interface GlyphItem extends GlyphStyle {
  output: string
}

const categories: GlyphCategory[] = [
  { category: 'script', name: 'Script', family: 'type' },
  { category: 'fraktur', name: 'Fraktur', family: 'type' },
  { category: 'double-struck', name: 'Double struck', family: 'type' },
  { category: 'circle', name: 'Circle', family: 'shapes' },
  { category: 'monospace', name: 'Monospace', family: 'type' },
  { category: 'sans-serif', name: 'Sans serif', family: 'type' },
  { category: 'serif', name: 'Serif', family: 'type' },
  { category: 'square', name: 'Square', family: 'shapes' },
  { category: 'fancy', name: 'Fancy', family: 'playful' },
  { category: 'latin', name: 'Latin', family: 'playful' },
  { category: 'currency', name: 'Currency', family: 'playful' },
]

const variantNames: Partial<Record<WeirdGlyphVariant, string>> = {
  smallcaps: 'Small caps',
  tildestrikethrough: 'Tilde strike',
  upside: 'Upside down',
  xabove: 'X above',
}

/**
 * Lists every supported style, showing each category's first variant before its alternatives.
 */
const stylesByCategory: GlyphStyle[][] = categories.map(category => {
  const variants = Object.keys(
    weirdGlyphData[category.category],
  ) as WeirdGlyphVariant[]

  return variants
    .sort(
      (left, right) => Number(right === 'regular') - Number(left === 'regular'),
    )
    .map(variant => ({
      ...category,
      variant,
      id: `${category.category}:${variant}`,
      variantName: variantNames[variant] ?? variant.replaceAll('-', ' '),
    }))
})

export const glyphStyles: GlyphStyle[] = [
  ...stylesByCategory.flatMap(styles => styles.slice(0, 1)),
  ...stylesByCategory.flatMap(styles => styles.slice(1)),
]
