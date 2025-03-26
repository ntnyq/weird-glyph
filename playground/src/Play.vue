<script lang="ts" setup>
import { ref, shallowRef, watchEffect } from 'vue'
import { weirdGlyph, weirdGlyphData } from 'weird-glyph'
import type { WeirdGlyphCategory, WeirdGlyphVariant } from 'weird-glyph'

const input = ref(
  // cSpell: disable-next-line
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet aliquam lectus.',
)

const groups: Array<{
  category: WeirdGlyphCategory
  variant: WeirdGlyphVariant
}> = []

Object.keys(weirdGlyphData).forEach(category => {
  const categoryData = weirdGlyphData[category as WeirdGlyphCategory]
  const variants = Object.keys(categoryData)

  variants.forEach(variant => {
    groups.push({
      category: category as WeirdGlyphCategory,
      variant: variant as WeirdGlyphVariant,
    })
  })
})

interface WeirdGlyphItem {
  key: string
  category: string
  variant: string
  output: string
}

const weirdGlyphList = shallowRef<WeirdGlyphItem[]>([])

watchEffect(() => {
  const result = groups.map(item => ({
    ...item,
    key: item.category + item.variant,
    output: weirdGlyph(input.value, item),
  }))
  weirdGlyphList.value = result
})
</script>

<template>
  <div class="relative h-full of-y-auto p-4">
    <div class="relative mx-auto my-8 max-w-3xl">
      <input
        v-model.trim="input"
        type="text"
        class="block w-full border border-base rounded px-4 py-2 text-lg font-medium"
        placeholder="Input something..."
        maxlength="200"
      />
    </div>

    <div class="relative mx-auto max-w-3xl break-all">
      <ul class="relative space-y-6">
        <li
          v-for="item in weirdGlyphList"
          :key="item.key"
          class="relative border border-base rounded-md p-6 shadow space-y-3"
        >
          <p class="text-2xl">{{ item.output || '--' }}</p>
          <h2 class="text-right text-xl font-semibold op-75">
            {{ item.category }}:{{ item.variant }}
          </h2>
        </li>
      </ul>
    </div>
  </div>
</template>
