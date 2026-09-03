<script lang="ts" setup>
import { computed, shallowRef } from 'vue'
import { weirdGlyph } from 'weird-glyph'
import GlyphComposer from './components/playground/GlyphComposer.vue'
import GlyphGallery from './components/playground/GlyphGallery.vue'
import { glyphStyles } from './utils/glyphs'

const input = shallowRef('Stay a little weird.')
const glyphs = computed(() =>
  glyphStyles.map(style => ({
    ...style,
    output: weirdGlyph(input.value, style),
  })),
)
const previews = computed(() =>
  glyphs.value.filter(item =>
    ['script:regular', 'circle:regular', 'fraktur:regular'].includes(item.id),
  ),
)
</script>

<template>
  <div class="page-shell">
    <GlyphComposer
      v-model="input"
      :previews="previews"
    />
    <GlyphGallery :items="glyphs" />
    <footer
      class="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-base py-7 text-xs text-muted"
    >
      <span>A little different. Still your words.</span>
      <span class="flex items-center gap-2">
        <span
          class="i-ri:code-s-slash-line"
          aria-hidden="true"
        />
        Made with weird-glyph
      </span>
    </footer>
  </div>
</template>
