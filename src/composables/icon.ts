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
  siIonic,
  siJavascript,
  siJson,
  siLatex,
  siMarkdown,
  siNodedotjs,
  siNuxtdotjs,
  siOpenverse,
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

import email from '@/assets/icons/email.json'

import _2fac from '@/assets/logos/2fac.json'
import browserstack from '@/assets/logos/browserstack.json'
import center_of_ci from '@/assets/logos/center_of_ci.json' // eslint-disable-line camelcase
import img from '@/assets/logos/img.json'
import pls from '@/assets/logos/pls.json'
import portfolio from '@/assets/logos/portfolio.json'
import reschume from '@/assets/logos/reschume.json'
import seeelaye from '@/assets/logos/seeelaye.json'

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
  ionic: siIonic,
  javascript: siJavascript,
  json: siJson,
  latex: siLatex,
  markdown: siMarkdown,
  nodedotjs: siNodedotjs,
  nuxtdotjs: siNuxtdotjs,
  openverse: siOpenverse,
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
  '2fac': _2fac,
  omniport: img,
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
