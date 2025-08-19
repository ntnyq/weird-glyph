import { expect, it } from 'vitest'
import { BASE_GLYPHS_STRING, weirdGlyph } from '../src/core'
import { FIXTURES } from './fixtures'

it.each(FIXTURES)('weirdGlyph - %s', fixture => {
  const result = weirdGlyph(BASE_GLYPHS_STRING, {
    category: fixture.category,
    variant: fixture.variant,
  })
  expect({
    result,
    options: {
      category: fixture.category,
      variant: fixture.variant,
    },
    input: BASE_GLYPHS_STRING,
  }).toMatchSnapshot()
})
