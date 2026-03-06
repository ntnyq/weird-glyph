import { weirdGlyphData } from '../src'
import type { WeirdGlyphCategory, WeirdGlyphVariant } from '../src'

const FIXTURES: {
  category: WeirdGlyphCategory
  variant: WeirdGlyphVariant
}[] = []

Object.keys(weirdGlyphData).forEach(category => {
  const categoryData = weirdGlyphData[category as WeirdGlyphCategory]
  const variants = Object.keys(categoryData)

  variants.forEach(variant => {
    FIXTURES.push({
      category: category as WeirdGlyphCategory,
      variant: variant as WeirdGlyphVariant,
    })
  })
})

export { FIXTURES }
