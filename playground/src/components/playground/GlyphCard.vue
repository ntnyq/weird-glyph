<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { computed, shallowRef, watch } from 'vue'
import type { GlyphItem } from '../../utils/glyphs'

const { item } = defineProps<{ item: GlyphItem }>()
const { copy, copied, text: copiedText, isSupported } = useClipboard()
const copyError = shallowRef('')
const isCopying = shallowRef(false)
const isCopied = computed(
  () => copied.value && copiedText.value === item.output,
)
const copyLabel = computed(() =>
  isCopied.value ? 'Copied' : `Copy ${item.name} ${item.variantName}`,
)

async function copyGlyph() {
  if (!item.output || isCopying.value) {
    return
  }
  copyError.value = ''

  if (!window.isSecureContext || !isSupported.value) {
    copyError.value =
      'Select the text to copy it, or open this page over HTTPS.'
    return
  }
  isCopying.value = true
  try {
    await copy(item.output)
  } catch {
    copyError.value = 'Copy was blocked. Select the text and copy it manually.'
  } finally {
    isCopying.value = false
  }
}

watch(
  () => item.output,
  () => {
    copyError.value = ''
  },
)
</script>

<template>
  <li
    class="glyph-card group relative min-w-0 rounded-2xl border border-base bg-surface p-5 sm:p-6"
  >
    <div class="mb-5 flex items-center justify-between gap-3">
      <div class="flex min-w-0 items-center gap-2">
        <h3 class="text-xs font-medium">{{ item.name }}</h3>
        <span
          class="variant-label truncate rounded px-1.5 py-0.5 font-mono text-9px text-muted capitalize"
          >{{ item.variantName }}</span
        >
      </div>
      <button
        @click="copyGlyph"
        :disabled="!item.output || isCopying"
        :aria-label="copyLabel"
        :title="copyLabel"
        :class="{ 'is-copied': isCopied }"
        type="button"
        class="copy-button relative h-8 w-8 flex shrink-0 items-center justify-center rounded-lg text-sm text-muted transition-colors disabled:opacity-30"
      >
        <span
          :class="isCopied ? 'i-ri:check-line' : 'i-ri:file-copy-line'"
          aria-hidden="true"
        />
        <span
          v-if="isCopied"
          class="copied-label absolute right-0 top-full mt-1 rounded px-2 py-1 text-10px"
          >Copied</span
        >
      </button>
    </div>
    <div class="min-h-21">
      <p
        :key="item.output"
        :class="{ 'is-empty': !item.output }"
        class="glyph-output glyph-refresh whitespace-pre-wrap"
      >
        {{ item.output || 'Your words go here…' }}
      </p>
    </div>
    <p
      class="sr-only"
      role="status"
    >
      {{ isCopied ? `${item.name} copied` : '' }}
    </p>
    <p
      v-if="copyError"
      role="alert"
      class="mt-3 text-xs text-accent"
    >
      {{ copyError }}
    </p>
  </li>
</template>

<style scoped>
.glyph-card {
  transition:
    border-color 180ms,
    box-shadow 180ms,
    transform 180ms;
  animation: card-enter 450ms ease-out backwards;
  animation-delay: var(--reveal-delay, 0ms);
}
.glyph-card:hover,
.glyph-card:focus-within {
  border-color: var(--c-input-border);
  box-shadow: 0 8px 22px -15px var(--c-shadow);
  transform: translateY(-3px);
}
.variant-label {
  background: var(--c-bg-base);
}
.copy-button:hover,
.copy-button.is-copied {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}
.copied-label {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}
.glyph-output {
  font-family: var(--font-glyph);
  font-size: 26px;
  line-height: 1.65;
  overflow-wrap: anywhere;
  animation-delay: var(--reveal-delay, 0ms);
}
.glyph-output.is-empty {
  color: var(--c-muted);
  font-family: var(--font-body);
  font-size: 18px;
}
@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .glyph-card {
    animation: none;
    transition: none;
  }
  .glyph-card:hover,
  .glyph-card:focus-within {
    transform: none;
  }
}
</style>
