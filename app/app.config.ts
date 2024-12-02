/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Defu } from 'defu'

export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'cool',
    tooltip: {
      default: {
        openDelay: 500
      }
    }
  }
})

type UserAppConfig = Defu<{}, []>

declare module 'nitropack/types' {
  interface AppConfig extends UserAppConfig {}
  interface NitroRuntimeConfig {}
}

export {}
