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
import center_of_ci from '@/assets/icons/center_of_ci.json' // eslint-disable-line camelcase
import email from '@/assets/icons/email.json'
import img from '@/assets/icons/img.json'
import openverse from '@/assets/icons/openverse.json'
import pls from '@/assets/icons/pls.json'
import portfolio from '@/assets/icons/portfolio.json'
import reschume from '@/assets/icons/reschume.json'
import seeelaye from '@/assets/icons/seeelaye.json'

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

  // Projects
  vocabulary: siCreativecommons,

  // Contacts
  github: siGithub,
  linkedin: siLinkedin,
  instagram: siInstagram,
}
const customIcons: Record<string, IconType> = {
  // Organisations
  center_of_ci, // eslint-disable-line camelcase
  browserstack: browserstack as IconType,
  img,

  // Projects
  omniport: img,
  openverse,
  pls,
  portfolio,
  reschume,
  seeelaye: seeelaye as IconType,

  // Contacts
  email,
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
