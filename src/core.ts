import { weirdGlyphData } from './data'
import type { Options, WeirdGlyphs, WeirdGlyphVariant } from './types'

/**
 * Base glyphs in string
 */
export const BASE_GLYPHS_STRING =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * Convert given string to weird glyphs
 * @param input - given string
 * @param options - convert options
 * @returns a string with weird glyphs, raw string if options not supported
 */
export function weirdGlyph(input: string, options: Options) {
  const categoryData = weirdGlyphData[options.category] as Record<
    WeirdGlyphVariant,
    WeirdGlyphs
  >

  if (categoryData) {
    const variantData = categoryData[options.variant]

    if (variantData) {
      const result: string[] = []

      input.split('').forEach(char => {
        const idx = BASE_GLYPHS_STRING.indexOf(char)

        if (idx !== -1) {
          result.push(variantData[idx])
        } else {
          result.push(char)
        }
      })

      return result.join('')
    }
  }

  return input
}
