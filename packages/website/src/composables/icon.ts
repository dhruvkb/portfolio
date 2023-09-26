import type { defineComponent } from 'vue'

import logo2Fac from 'virtual:icons/app/2fac'
import logoBrowserstack from 'virtual:icons/app/browserstack'
import logoImg from 'virtual:icons/app/img'
import logoPls from 'virtual:icons/app/pls'
import logoPortfolio from 'virtual:icons/app/portfolio'
import logoRecivi from 'virtual:icons/app/recivi'
import heroCheck from 'virtual:icons/heroicons-outline/check'
import heroMail from 'virtual:icons/heroicons-outline/mail'
import heroPrinter from 'virtual:icons/heroicons-outline/printer'
import heroRss from 'virtual:icons/heroicons-outline/rss'
import heroShare from 'virtual:icons/heroicons-outline/share'
import heroStar from 'virtual:icons/heroicons-outline/star'
import siAstro from 'virtual:icons/simple-icons/astro'
import siAutomattic from 'virtual:icons/simple-icons/automattic'
import siCreativecommons from 'virtual:icons/simple-icons/creativecommons'
import siDjango from 'virtual:icons/simple-icons/django'
import siDocker from 'virtual:icons/simple-icons/docker'
import siElasticsearch from 'virtual:icons/simple-icons/elasticsearch'
import siFampay from 'virtual:icons/simple-icons/fampay'
import siGithub from 'virtual:icons/simple-icons/github'
import siGnubash from 'virtual:icons/simple-icons/gnubash'
import siHackerearth from 'virtual:icons/simple-icons/hackerearth'
import siInstagram from 'virtual:icons/simple-icons/instagram'
import siIonic from 'virtual:icons/simple-icons/ionic'
import siJavascript from 'virtual:icons/simple-icons/javascript'
import siJson from 'virtual:icons/simple-icons/json'
import siLinkedin from 'virtual:icons/simple-icons/linkedin'
import siMarkdown from 'virtual:icons/simple-icons/markdown'
import siMdx from 'virtual:icons/simple-icons/mdx'
import siNuxtdotjs from 'virtual:icons/simple-icons/nuxtdotjs'
import siOpenverse from 'virtual:icons/simple-icons/openverse'
import siPostresql from 'virtual:icons/simple-icons/postgresql'
import siPython from 'virtual:icons/simple-icons/python'
import siReact from 'virtual:icons/simple-icons/react'
import siReadthedocs from 'virtual:icons/simple-icons/readthedocs'
import siRedis from 'virtual:icons/simple-icons/redis'
import siRuby from 'virtual:icons/simple-icons/ruby'
import siRubyonrails from 'virtual:icons/simple-icons/rubyonrails'
import siRust from 'virtual:icons/simple-icons/rust'
import siSphinx from 'virtual:icons/simple-icons/sphinx'
import siStorybook from 'virtual:icons/simple-icons/storybook'
import siTailwindcss from 'virtual:icons/simple-icons/tailwindcss'
import siTypescript from 'virtual:icons/simple-icons/typescript'
import siVuedotjs from 'virtual:icons/simple-icons/vuedotjs'
import siWordpress from 'virtual:icons/simple-icons/wordpress'
import siYaml from 'virtual:icons/simple-icons/yaml'

type ComponentDefinition = ReturnType<typeof defineComponent>

export const icons: Record<string, ComponentDefinition> = {
  // Organisations
  automattic: siAutomattic,
  creative_commons: siCreativecommons,
  fampay: siFampay,
  hackerearth: siHackerearth,
  wordpress: siWordpress,
  browserstack: logoBrowserstack,
  img: logoImg,

  // Technologies
  astro: siAstro,
  django: siDjango,
  docker: siDocker,
  elasticsearch: siElasticsearch,
  gnubash: siGnubash,
  ionic: siIonic,
  javascript: siJavascript,
  json: siJson,
  markdown: siMarkdown,
  mdx: siMdx,
  nuxtdotjs: siNuxtdotjs,
  openverse: siOpenverse,
  postgresql: siPostresql,
  python: siPython,
  react: siReact,
  readthedocs: siReadthedocs,
  redis: siRedis,
  ruby: siRuby,
  rails: siRubyonrails,
  rust: siRust,
  sphinx: siSphinx,
  storybook: siStorybook,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vuedotjs: siVuedotjs,
  yaml: siYaml,

  // Projects
  central_email_system: logoBrowserstack,
  vocabulary: siCreativecommons,
  '2fac': logo2Fac,
  omniport: logoImg,
  pls: logoPls,
  portfolio: logoPortfolio,
  recivi: logoRecivi,

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
