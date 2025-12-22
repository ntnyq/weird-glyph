import { describe, expect, it } from 'vitest'
import { BASE_GLYPHS_STRING, weirdGlyph } from '../src/core'
import { FIXTURES } from './fixtures'

describe('weirdGlyph', () => {
  it.each(FIXTURES)('should convert all glyphs for %s', fixture => {
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

  it('should return original input for invalid category', () => {
    const input = 'Hello World'
    const result = weirdGlyph(input, {
      // @ts-expect-error invalid category for testing
      category: 'invalid-category',
      variant: 'regular',
    })
    expect(result).toBe(input)
  })

  it('should return original input for invalid variant', () => {
    const input = 'Hello World'
    const result = weirdGlyph(input, {
      category: 'serif',
      // @ts-expect-error invalid variant for testing
      variant: 'invalid-variant',
    })
    expect(result).toBe(input)
  })

  it('should handle empty string', () => {
    const result = weirdGlyph('', {
      category: 'serif',
      variant: 'bold',
    })
    expect(result).toBe('')
  })

  it('should preserve unsupported characters', () => {
    const input = 'Hello! @#$% 世界'
    const result = weirdGlyph(input, {
      category: 'serif',
      variant: 'bold',
    })
    // Should convert H, e, l, o but preserve !, @, #, $, %, space, and Chinese characters
    expect(result).toContain('!')
    expect(result).toContain('@')
    expect(result).toContain('世界')
    expect(result).not.toBe(input) // Should have some conversion
  })

  it('should handle mixed supported and unsupported characters', () => {
    const input = 'Test123!@#'
    const result = weirdGlyph(input, {
      category: 'monospace',
      variant: 'regular',
    })
    // T, e, s, t, 1, 2, 3 should be converted
    // !, @, # should be preserved
    expect(result).toContain('!')
    expect(result).toContain('@')
    expect(result).toContain('#')
    expect(result).not.toBe(input)
  })

  it('should handle strings with only unsupported characters', () => {
    const input = '!@#$%^&*()'
    const result = weirdGlyph(input, {
      category: 'serif',
      variant: 'bold',
    })
    expect(result).toBe(input)
  })

  it('should convert uppercase letters correctly', () => {
    const input = 'ABCXYZ'
    const result = weirdGlyph(input, {
      category: 'serif',
      variant: 'bold',
    })
    // cSpell: disable-next-line
    expect(result).toBe('𝐀𝐁𝐂𝐗𝐘𝐙')
  })

  it('should convert lowercase letters correctly', () => {
    const input = 'abcxyz'
    const result = weirdGlyph(input, {
      category: 'serif',
      variant: 'bold',
    })
    // cSpell: disable-next-line
    expect(result).toBe('𝐚𝐛𝐜𝐱𝐲𝐳')
  })

  it('should convert digits correctly', () => {
    const input = '0123456789'
    const result = weirdGlyph(input, {
      category: 'serif',
      variant: 'bold',
    })
    expect(result).toBe('𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗')
  })

  it('should handle spaces correctly', () => {
    const input = 'Hello World'
    const result = weirdGlyph(input, {
      category: 'serif',
      variant: 'bold',
    })
    expect(result).toContain(' ')
    const parts = result.split(' ')
    expect(parts).toHaveLength(2)
  })
})

describe('BASE_GLYPHS_STRING', () => {
  it('should contain exactly 62 characters', () => {
    expect(BASE_GLYPHS_STRING).toHaveLength(62)
  })

  it('should contain all uppercase letters A-Z', () => {
    const uppercase = BASE_GLYPHS_STRING.slice(0, 26)
    expect(uppercase).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  })

  it('should contain all lowercase letters a-z', () => {
    const lowercase = BASE_GLYPHS_STRING.slice(26, 52)
    expect(lowercase).toBe('abcdefghijklmnopqrstuvwxyz')
  })

  it('should contain all digits 0-9', () => {
    const digits = BASE_GLYPHS_STRING.slice(52, 62)
    expect(digits).toBe('0123456789')
  })
})
