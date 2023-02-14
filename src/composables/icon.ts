import type { defineComponent } from 'vue'

import logo2Fac from 'virtual:icons/app/2fac'
import logoBrowserstack from 'virtual:icons/app/browserstack'
import logoCenterofci from 'virtual:icons/app/centerofci'
import logoImg from 'virtual:icons/app/img'
import logoPls from 'virtual:icons/app/pls'
import logoPortfolio from 'virtual:icons/app/portfolio'
import logoReschume from 'virtual:icons/app/reschume'
import logoSeeelaye from 'virtual:icons/app/seeelaye'
import heroCheck from 'virtual:icons/heroicons-outline/check'
import heroMail from 'virtual:icons/heroicons-outline/mail'
import heroPrinter from 'virtual:icons/heroicons-outline/printer'
import heroRss from 'virtual:icons/heroicons-outline/rss'
import heroShare from 'virtual:icons/heroicons-outline/share'
import heroStar from 'virtual:icons/heroicons-outline/star'
import siAutomattic from 'virtual:icons/simple-icons/automattic'
import siCreativecommons from 'virtual:icons/simple-icons/creativecommons'
import siDjango from 'virtual:icons/simple-icons/django'
import siDocker from 'virtual:icons/simple-icons/docker'
import siFampay from 'virtual:icons/simple-icons/fampay'
import siGithub from 'virtual:icons/simple-icons/github'
import siGnubash from 'virtual:icons/simple-icons/gnubash'
import siHackerearth from 'virtual:icons/simple-icons/hackerearth'
import siInstagram from 'virtual:icons/simple-icons/instagram'
import siIonic from 'virtual:icons/simple-icons/ionic'
import siJavascript from 'virtual:icons/simple-icons/javascript'
import siJson from 'virtual:icons/simple-icons/json'
import siLatex from 'virtual:icons/simple-icons/latex'
import siLinkedin from 'virtual:icons/simple-icons/linkedin'
import siMarkdown from 'virtual:icons/simple-icons/markdown'
import siNodedotjs from 'virtual:icons/simple-icons/nodedotjs'
import siNuxtdotjs from 'virtual:icons/simple-icons/nuxtdotjs'
import siOpenverse from 'virtual:icons/simple-icons/openverse'
import siPython from 'virtual:icons/simple-icons/python'
import siReadthedocs from 'virtual:icons/simple-icons/readthedocs'
import siTailwindcss from 'virtual:icons/simple-icons/tailwindcss'
import siTypescript from 'virtual:icons/simple-icons/typescript'
import siVuedotjs from 'virtual:icons/simple-icons/vuedotjs'
import siWordpress from 'virtual:icons/simple-icons/wordpress'

type ComponentDefinition = ReturnType<typeof defineComponent>

export const icons: Record<string, ComponentDefinition> = {
  // Organisations
  automattic: siAutomattic,
  creative_commons: siCreativecommons,
  fampay: siFampay,
  hackerearth: siHackerearth,
  wordpress: siWordpress,
  center_of_ci: logoCenterofci,
  browserstack: logoBrowserstack,
  img: logoImg,

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
  '2fac': logo2Fac,
  omniport: logoImg,
  pls: logoPls,
  portfolio: logoPortfolio,
  reschume: logoReschume,
  seeelaye: logoSeeelaye,

  // Contacts
  github: siGithub,
  linkedin: siLinkedin,
  instagram: siInstagram,
  email: heroMail,

  // Blog
  check: heroCheck,
  share: heroShare,
  star: heroStar,
  rss: heroRss,

  // Résumé
  print: heroPrinter,
}

// TODO: Replace individual aria-hidden attributes with an SVG transform
// https://github.com/antfu/unplugin-icons#global-custom-icon-transformation
export const useIcon = () => {
  const getIcon = (slug: string): ComponentDefinition | undefined => {
    if (slug in icons) return icons[slug]
    return undefined
  }

  return {
    getIcon,
  }
}
