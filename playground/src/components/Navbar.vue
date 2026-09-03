<script lang="ts" setup>
import { repository, version } from '../../../package.json'
import { isDark, toggleDark } from '../composables/dark'

const repositoryUrl = repository.startsWith('https')
  ? repository
  : `https://github.com/${repository}`
</script>

<template>
  <header class="page-shell flex h-20 items-center justify-between gap-4">
    <a
      href="#playground"
      aria-label="weird-glyph playground"
      class="flex items-center gap-3 rounded-lg"
    >
      <span
        class="brand-mark"
        aria-hidden="true"
        >w<span>g</span></span
      >
      <span class="font-display text-xl font-semibold tracking-tight"
        >weird-glyph<span class="text-accent">.</span></span
      >
      <span
        class="hidden border border-base rounded-full px-2 py-0.5 font-mono text-10px text-muted sm:block"
        >v{{ version }}</span
      >
    </a>
    <nav
      aria-label="Main navigation"
      class="flex items-center gap-2 sm:gap-5"
    >
      <span class="hidden text-xs text-muted sm:block"
        >A playground for your words</span
      >
      <button
        @click="toggleDark"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="btn-icon"
        type="button"
      >
        <span
          class="i-ri:sun-line dark:i-ri:moon-line"
          aria-hidden="true"
        />
      </button>
      <a
        :href="repositoryUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View weird-glyph on GitHub"
        class="btn-icon"
      >
        <span
          class="i-ri:github-fill"
          aria-hidden="true"
        />
      </a>
    </nav>
  </header>
</template>

<style scoped>
.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: var(--c-accent);
  color: var(--c-surface);
  font-family: Georgia, serif;
  font-size: 27px;
  font-style: italic;
  letter-spacing: -7px;
  padding-right: 6px;
  transform: rotate(-7deg);
}
.brand-mark span {
  transform: translateY(3px);
}
</style>
