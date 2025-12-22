import { weirdGlyphData } from './data'
import type {
  Options,
  WeirdGlyphCategory,
  WeirdGlyphs,
  WeirdGlyphVariant,
} from './types'

/**
 * Base glyphs in string
 */
export const BASE_GLYPHS_STRING =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * Map for fast character index lookup
 */
const GLYPH_INDEX_MAP = new Map(
  BASE_GLYPHS_STRING.split('').map((char, idx) => [char, idx]),
)

/**
 * Type guard to check if category exists in data
 */
function isCategoryValid(
  category: WeirdGlyphCategory,
): category is keyof typeof weirdGlyphData {
  return category in weirdGlyphData
}

/**
 * Type guard to check if variant exists in category
 */
function isVariantValid(
  categoryData: Record<string, WeirdGlyphs>,
  variant: WeirdGlyphVariant,
): boolean {
  return variant in categoryData
}

/**
 * Convert a single character to weird glyph
 * @param char - character to convert
 * @param variantData - variant data array
 * @returns converted character or original if not found
 */
function convertChar(char: string, variantData: WeirdGlyphs): string {
  const idx = GLYPH_INDEX_MAP.get(char)
  return idx === undefined ? char : variantData[idx]
}

/**
 * Convert given string to weird glyphs
 * @param input - given string
 * @param options - convert options
 * @returns a string with weird glyphs, raw string if options not supported
 */
export function weirdGlyph(input: string, options: Options): string {
  // Validate category
  if (!isCategoryValid(options.category)) {
    return input
  }

  const categoryData = weirdGlyphData[options.category]

  // Validate variant
  if (!isVariantValid(categoryData, options.variant)) {
    return input
  }

  const variantData = categoryData[options.variant as keyof typeof categoryData]

  // Convert all characters
  return input
    .split('')
    .map(char => convertChar(char, variantData))
    .join('')
}
