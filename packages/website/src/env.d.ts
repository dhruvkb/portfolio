/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface Window {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  Alpine: import('alpinejs').Alpine
}
