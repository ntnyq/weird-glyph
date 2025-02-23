<script lang="ts" setup>
import { name, repository, version } from '../../../package.json'
import { toggleDark } from '../composables/dark'
</script>

<template>
  <div
    class="h-$h-navbar flex flex-wrap items-center justify-between border-b border-base p-2 px-4"
  >
    <div class="flex gap-1">
      <h1
        class="from-teal-400 to-indigo-500 bg-gradient-to-r bg-clip-text text-2xl text-transparent font-bold dark:to-yellow-200"
      >
        {{ name }}
      </h1>
      <small class="font-medium">{{ version }}</small>
    </div>
    <div class="flex items-center gap-2">
      <button
        @click="toggleDark"
        class="btn-icon"
        type="button"
        role="button"
      >
        <div class="i-ri:sun-line dark:i-ri:moon-line" />
      </button>
      <a
        :href="
          repository.startsWith('https')
            ? repository
            : `https://github.com/${repository}`
        "
        target="_blank"
        rel="noopener noreferrer"
        class="btn-icon"
        role="button"
      >
        <div class="i-ri:github-fill" />
      </a>
    </div>
  </div>
</template>
