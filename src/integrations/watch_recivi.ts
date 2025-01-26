import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { AstroIntegration } from 'astro'
import chokidar from 'chokidar'

import { site } from '../stores/site'

const projectRoot = resolve(import.meta.filename, '../../..')
const storeFile = join(projectRoot, 'src/stores/recivi.ts')

export function watchRecivi(): AstroIntegration {
  return {
    name: 'watchRecivi',
    hooks: {
      'astro:server:setup': ({ server, logger }) => {
        if (!site.reciviUrl.startsWith('file://')) return

        const reciviFile = fileURLToPath(site.reciviUrl)
        logger.info(`Watching Récivi data file: ${reciviFile}`)

        chokidar.watch(reciviFile).on('change', () => {
          logger.info('Recivi data changed, reloading module')
          const storeModule = server.moduleGraph.getModuleById(storeFile)
          if (storeModule) {
            server.moduleGraph.invalidateModule(storeModule)
            server.ws.send({ type: 'full-reload' })
          }
        })
      },
    },
  }
}
