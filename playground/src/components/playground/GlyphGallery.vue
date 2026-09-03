<script lang="ts" setup>
import { computed, shallowRef } from 'vue'
import type { GlyphFamily, GlyphItem } from '../../utils/glyphs'
import GlyphCard from './GlyphCard.vue'

const { items } = defineProps<{ items: GlyphItem[] }>()
const selectedFamily = shallowRef<GlyphFamily | 'all'>('all')
const filters: { label: string; value: GlyphFamily | 'all' }[] = [
  { label: 'All styles', value: 'all' },
  { label: 'Typography', value: 'type' },
  { label: 'Shapes', value: 'shapes' },
  { label: 'Playful', value: 'playful' },
]
const visibleItems = computed(() =>
  selectedFamily.value === 'all'
    ? items
    : items.filter(item => item.family === selectedFamily.value),
)
</script>

<template>
  <section aria-labelledby="gallery-title">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-5">
      <div class="flex items-center gap-3">
        <h2
          id="gallery-title"
          class="font-display text-xl font-medium tracking-tight"
        >
          Your words, remixed
        </h2>
        <span
          class="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-10px text-accent"
          aria-live="polite"
          >{{ visibleItems.length }}</span
        >
      </div>
      <div
        class="filter-bar flex max-w-full gap-1 rounded-full p-1"
        role="group"
        aria-label="Filter glyph styles"
      >
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="selectedFamily = filter.value"
          :aria-pressed="selectedFamily === filter.value"
          class="filter-button whitespace-nowrap rounded-full px-2.5 py-2 text-11px text-muted transition-colors sm:px-4 sm:text-xs"
          type="button"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>
    <ul
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      aria-label="Glyph styles"
    >
      <GlyphCard
        v-for="(item, index) in visibleItems"
        :key="item.id"
        :item="item"
        :style="{ '--reveal-delay': `${Math.min(index, 5) * 35}ms` }"
      />
    </ul>
    <p class="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
      <span
        class="i-ri:file-copy-line"
        aria-hidden="true"
      />
      Find your favorite. Copy it anywhere.
    </p>
  </section>
</template>

<style scoped>
.filter-bar {
  background: var(--c-filter-bg);
}
.filter-button:hover {
  color: var(--c-text-base);
}
.filter-button[aria-pressed='true'] {
  color: var(--c-text-base);
  background: var(--c-surface);
  box-shadow: 0 1px 4px color-mix(in srgb, var(--c-shadow) 12%, transparent);
}
</style>
