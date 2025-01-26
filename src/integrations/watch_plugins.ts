import { readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'

import type { AstroIntegration } from 'astro'

const projectRoot = resolve(import.meta.filename, '../../..')
const pluginsDir = join(projectRoot, 'src/plugins/')

export function watchPlugins(): AstroIntegration {
  return {
    name: 'watchPlugins',
    hooks: {
      'astro:config:setup': ({ addWatchFile, logger }) => {
        readdirSync(pluginsDir).forEach((file) => {
          const watchPath = join(pluginsDir, file)
          logger.info(`Watching plugin: ${watchPath}`)
          addWatchFile(watchPath)
        })
      },
    },
  }
}
