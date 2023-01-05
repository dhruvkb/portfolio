import { defineConfig } from 'iles'

import icons from '@islands/icons'
// eslint-disable-next-line import/no-extraneous-dependencies
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  siteUrl: 'https://dhruvkb.dev',
  // TODO: turbo: true,
  modules: [
    // https://github.com/ElMassimo/iles/blob/main/packages/icons/src/icons.ts
    icons({
      scale: 1,
      compiler: 'vue3',
      resolver: {
        customCollections: ['icons', 'logos'],
      },
      customCollections: {
        icons: FileSystemIconLoader('./src/assets/icons'),
        logos: FileSystemIconLoader('./src/assets/logos'),
      },
    }),
  ],
})
