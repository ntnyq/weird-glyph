<script lang="ts" setup>
import { computed, useTemplateRef } from 'vue'
import type { GlyphItem } from '../../utils/glyphs'

defineProps<{ previews: GlyphItem[] }>()

const model = defineModel<string>({ required: true })
const inputRef = useTemplateRef<HTMLTextAreaElement>('input')
const phrases = [
  'Hello, world!',
  'Make something good.',
  'Stay a little weird.',
]
const compactTextThreshold = 60
const isLongText = computed(() => model.value.length > compactTextThreshold)

function setText(text: string) {
  model.value = text
  inputRef.value?.focus({ preventScroll: true })
}
</script>

<template>
  <section
    aria-labelledby="composer-title"
    class="composer relative pb-6 pt-6"
  >
    <div class="relative z-1 mb-12 text-center sm:mb-12">
      <h1
        id="composer-title"
        class="font-display text-2xl font-medium tracking-tight sm:text-3xl"
      >
        Give your words a little character.
      </h1>
    </div>

    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-21 h-22 sm:top-15"
    >
      <div
        v-for="(preview, index) in previews"
        :key="preview.id"
        :class="`echo-${index}`"
        class="glyph-echo absolute max-w-60 truncate px-2 text-2xl sm:max-w-80 sm:text-3xl"
      >
        <span
          :key="preview.output"
          class="glyph-refresh inline-block"
          >{{ preview.output || '…' }}</span
        >
      </div>
    </div>

    <div class="input-panel relative z-2 rounded-3xl p-5 sm:p-6">
      <div class="mb-4 flex items-center justify-between gap-3">
        <label
          for="glyph-input"
          class="flex items-center gap-2 text-xs font-medium"
        >
          <span
            class="i-ri:input-method-line text-base text-accent"
            aria-hidden="true"
          />
          Your words
        </label>
        <span
          class="flex items-center gap-2 font-mono text-10px text-accent tracking-wider uppercase"
        >
          <span class="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
          Live preview
        </span>
      </div>

      <textarea
        id="glyph-input"
        ref="input"
        v-model="model"
        :class="{ 'is-long': isLongText }"
        class="composer-input block w-full resize-none border-0 bg-transparent font-display font-medium"
        placeholder="Type something here…"
        aria-describedby="input-hint input-count"
        maxlength="200"
        rows="2"
        spellcheck="false"
      />

      <div
        class="mt-4 flex items-center justify-between gap-3 border-t border-base pt-4 text-xs text-muted"
      >
        <p
          id="input-hint"
          class="flex items-center gap-2"
        >
          <span
            class="i-ri:corner-down-right-line hidden text-base sm:block"
            aria-hidden="true"
          />
          <span
            ><span class="hidden sm:inline">Type here. </span>Every style
            follows.</span
          >
        </p>
        <div class="flex items-center gap-3 sm:gap-5">
          <button
            @click="setText('')"
            :disabled="!model"
            type="button"
            class="rounded px-1 py-1 transition-colors hover:text-accent disabled:opacity-35"
            aria-label="Clear text"
          >
            Clear
          </button>
          <span
            id="input-count"
            class="whitespace-nowrap font-mono text-10px tabular-nums"
            >{{ model.length }} / 200</span
          >
        </div>
      </div>
    </div>

    <div
      class="relative z-2 mt-4 flex flex-wrap items-center justify-center gap-2 text-xs"
    >
      <span class="mr-1 text-muted">Try a phrase</span>
      <button
        v-for="phrase in phrases"
        :key="phrase"
        @click="setText(phrase)"
        :aria-pressed="model === phrase"
        type="button"
        class="phrase-button rounded-full border border-base px-3 py-2 text-muted transition-colors hover:border-accent hover:text-accent"
      >
        {{ phrase }}
      </button>
    </div>
    <p class="mt-3 text-center text-11px text-muted">
      Works with A–Z, a–z and 0–9. Other characters stay as you type them.
    </p>
  </section>
</template>

<style scoped>
.composer {
  isolation: isolate;
}

.input-panel {
  background: var(--c-surface);
  border: 1px solid var(--c-input-border);
  box-shadow:
    0 16px 50px -34px var(--c-shadow),
    0 2px 8px -5px var(--c-shadow);
  transition:
    border-color 200ms,
    box-shadow 200ms;
  animation: composer-enter 650ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.input-panel:focus-within {
  border-color: var(--c-accent);
  box-shadow:
    0 0 0 4px var(--c-accent-soft),
    0 20px 55px -34px var(--c-shadow);
}
.composer-input {
  height: 84px;
  color: var(--c-text-base);
  caret-color: var(--c-accent);
  font-size: clamp(34px, 5.7vw, 68px);
  line-height: 1.15;
  letter-spacing: -0.055em;
  scrollbar-width: thin;
}
.composer-input:focus-visible {
  outline: none;
}
.composer-input::placeholder {
  color: var(--c-muted);
  opacity: 0.6;
}
.composer-input.is-long {
  font-size: clamp(26px, 3.8vw, 42px);
  letter-spacing: -0.035em;
}
.glyph-echo {
  color: var(--c-accent);
  opacity: 0.36;
  font-family: var(--font-glyph);
}
.echo-0 {
  top: 8px;
  left: 2%;
  rotate: -9deg;
}
.echo-1 {
  top: 17px;
  left: 38%;
  rotate: 4deg;
  opacity: 0.23;
}
.echo-2 {
  top: 8px;
  right: 1%;
  rotate: 9deg;
}
.phrase-button[aria-pressed='true'] {
  border-color: var(--c-input-border);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}
.live-dot {
  box-shadow: 0 0 0 3px var(--c-accent-soft);
}

@keyframes composer-enter {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.99);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@media (max-width: 639px) {
  .composer-input {
    height: 108px;
  }
  .echo-0 {
    left: 0;
    top: 12px;
  }
  .echo-1 {
    display: none;
  }
  .echo-2 {
    right: 0;
    top: 12px;
  }
  .glyph-echo {
    max-width: 44%;
    font-size: 22px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .input-panel {
    animation: none;
    transition: none;
  }
}
</style>
