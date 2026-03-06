/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // oxlint-disable-next-line typescript/ban-types, typescript/no-empty-object-type, typescript/no-explicit-any
  const component: DefineComponent<{}, {}, any>
  export default component
}
