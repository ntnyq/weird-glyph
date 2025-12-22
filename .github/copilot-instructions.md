# weird-glyph Copilot Instructions

## Project Overview

A TypeScript library that transforms standard ASCII characters (A-Z, a-z, 0-9) into Unicode "weird glyphs" (fancy text variations like 𝒜𝒷𝒸 or 🅐🅑🅒). Core library in `/src`, interactive Vue 3 playground in `/playground`.

## Architecture

### Data-Driven Design

- **[src/weird-glyph.json](../src/weird-glyph.json)**: 2000+ line source-of-truth JSON with 62-character arrays (A-Z, a-z, 0-9 mapped to Unicode variants)
- **Type structure**: `WeirdGlyphData[category][variant]` → `WeirdGlyphs` array (string[62])
- **Character mapping**: `BASE_GLYPHS_STRING` (line 12-13 in [core.ts](../src/core.ts)) defines index order; `GLYPH_INDEX_MAP` provides O(1) lookups
- **Validation chain**: Category exists → Variant exists → Array lookup by character index

### Module Boundaries

- [src/data.ts](../src/data.ts): JSON import with `with { type: 'json' }` (TC39 import attributes)
- [src/core.ts](../src/core.ts): Conversion logic (type guards, character mapping, public `weirdGlyph()` function)
- [src/types.ts](../src/types.ts): Strict TypeScript definitions for all 11 categories and 18 variants
- [src/index.ts](../src/index.ts): Barrel export (all exports public)

## Critical Patterns

### Type Safety

All category/variant combinations are **strictly typed** in `WeirdGlyphData`. When adding new categories/variants:

1. Add to union types in [types.ts](../src/types.ts) (`WeirdGlyphCategory` or `WeirdGlyphVariant`)
2. Extend `WeirdGlyphData` interface with exact variant keys
3. Update [weird-glyph.json](../src/weird-glyph.json) with corresponding 62-element arrays
4. Tests will auto-discover via `FIXTURES` generation in [tests/fixtures.ts](../tests/fixtures.ts)

### Validation Pattern

Functions use **early-return validation** instead of throwing errors:

```typescript
if (!isCategoryValid(options.category)) return input
if (!isVariantValid(categoryData, options.variant)) return input
```

Invalid inputs return original strings unchanged (graceful degradation).

### Testing Approach

- **Snapshot testing**: All category/variant combinations tested via generated fixtures (see [tests/fixtures.ts](../tests/fixtures.ts))
- Run with `pnpm test` (vitest in non-watch mode by default)
- Snapshots in `tests/__snapshots__/` verify exact Unicode output

## Development Workflows

### Build & Dev

- **Build**: `pnpm build` (tsdown with minification, platform: neutral)
- **Watch mode**: `pnpm dev` (tsdown --watch)
- **Playground dev**: `pnpm play` (Vite dev server for Vue playground)
- **Deploy**: `pnpm deploy` (builds library + playground for Vercel)

### Linting & Checks

- Uses `@ntnyq/eslint-config` (flat config) with UnoCSS integration
- Run `pnpm lint` for ESLint, `pnpm typecheck` for tsc
- Pre-release: `pnpm release:check` runs build + lint + typecheck + test

### Monorepo Structure

- **pnpm workspace**: Root package exports library; `playground/` consumes via `"weird-glyph": "workspace:*"`
- Playground imports directly: `import { weirdGlyph } from 'weird-glyph'`
- When modifying library, rebuild to see changes in playground

## Playground Architecture

Vue 3 SFC at [playground/src/Play.vue](../playground/src/Play.vue):

- Generates all category/variant combos by iterating `weirdGlyphData` keys (same pattern as test fixtures)
- Reactive `watchEffect` re-converts input text on every change
- UnoCSS for styling (configured in [playground/uno.config.ts](../playground/uno.config.ts))

## Key Conventions

- **Import attributes**: Use `with { type: 'json' }` (not `assert`) per TC39 spec
- **Array immutability**: `WeirdGlyphs` arrays are read-only; never mutate
- **Character assumptions**: Only handles 62 base characters; others pass through unchanged
- **No runtime errors**: Functions validate and return input on failure (no exceptions)

## Common Tasks

**Add new category**: Update `WeirdGlyphCategory` union, extend `WeirdGlyphData` interface, add JSON data with 62-element arrays for all variants
**Add new variant**: Update `WeirdGlyphVariant` union, add keys to relevant categories in `WeirdGlyphData`, populate JSON
**Fix mapping**: Check `GLYPH_INDEX_MAP` order matches `BASE_GLYPHS_STRING` (uppercase, lowercase, digits)
**Debug playground**: Verify workspace link with `pnpm -C playground run dev` and rebuild library
