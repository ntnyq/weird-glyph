/**
 * @file UnoCSS config
 */

import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetWind3(),
    presetIcons({
      autoInstall: true,
      scale: 1.2,
      extraProperties: {
        color: 'inherit',
        // Avoid crushing of icons in crowded situations
        'min-width': '1.2em',
      },
    }),
  ],

  shortcuts: {
    'font-display': 'font-[var(--font-display)]',
    'text-muted': 'text-$c-muted',
    'text-accent': 'text-$c-accent',
    'bg-accent': 'bg-$c-accent',
    'bg-accent-soft': 'bg-$c-accent-soft',
    'bg-surface': 'bg-$c-surface',
    'border-accent': 'border-$c-accent',
    'bg-base': 'bg-$c-bg-base',
    'border-base': 'border-$c-border',
    'border-bg-base': 'border-$c-bg-base',
    'text-base': 'text-$c-text-base',

    'btn-action': `min-w-140px rounded-md bg-$c-text-base px-3 py-2 text-$c-bg-base transition hover:opacity-90`,
    'btn-icon':
      'h-9 w-9 inline-flex items-center justify-center rounded-full text-lg text-muted transition-colors hover:bg-accent-soft hover:text-accent',
  },
})
