import type { SimpleIcon } from 'simple-icons'
import {
  siAutomattic,
  siCreativecommons,
  siFampay,
  siHackerearth,
  siWordpress,
  siDjango,
  siDocker,
  siGnubash,
  siJavascript,
  siJson,
  siLatex,
  siMarkdown,
  siNodedotjs,
  siNuxtdotjs,
  siPython,
  siReadthedocs,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  siGithub,
  siInstagram,
  siLinkedin,
} from 'simple-icons/icons'

import type { Icon as IconType, Path } from '@/models/icon'

import browserstack from '@/assets/icons/browserstack.json'
import centerofci from '@/assets/icons/centerofci.json'
import envelope from '@/assets/icons/envelope.json'
import imgiitroorkee from '@/assets/icons/imgiitroorkee.json'
import reschume from '@/assets/icons/reschume.json'

const simpleIcons: Record<string, SimpleIcon> = {
  // Organisations
  automattic: siAutomattic,
  creative_commons: siCreativecommons,
  fampay: siFampay,
  hackerearth: siHackerearth,
  wordpress: siWordpress,

  // Technologies
  django: siDjango,
  docker: siDocker,
  gnubash: siGnubash,
  javascript: siJavascript,
  json: siJson,
  latex: siLatex,
  markdown: siMarkdown,
  nodedotjs: siNodedotjs,
  nuxtdotjs: siNuxtdotjs,
  python: siPython,
  readthedocs: siReadthedocs,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vuedotjs: siVuedotjs,

  // Contacts
  github: siGithub,
  linkedin: siLinkedin,
  instagram: siInstagram,
}
const customIcons: Record<string, IconType> = {
  // Organisations
  center_of_ci: centerofci as IconType,
  browserstack: browserstack as IconType,
  img: imgiitroorkee as IconType,

  // Technologies
  reschume: reschume as IconType,

  // Contacts
  email: envelope as IconType,
}

export const useIcon = () => {
  const getIconPaths = (slug: string): Path[] => {
    if (slug in customIcons) return customIcons[slug].paths
    if (slug in simpleIcons) {
      return [{
        d: simpleIcons[slug].path,
        'fill-rule': 'nonzero',
      }]
    }
    return []
  }

  return {
    getIconPaths,
  }
}
