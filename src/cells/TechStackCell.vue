<!--
Renders the tech stack of a project as a list of technologies alongside their
icons and logos.
-->

<script setup lang="ts">
  import { SimpleIcon } from 'simple-icons'
  import {
    siDjango,
    siDocker,
    siGnubash,
    siJavascript,
    siLatex,
    siMarkdown,
    siNuxtdotjs,
    siPython,
    siReadthedocs,
    siTailwindcss,
    siTypescript,
    siVuedotjs,
  } from 'simple-icons/icons'

  import { Path } from '@/models/icon'
  import { Technology } from '@/models/project'

  import Icon from '@/components/Icon.vue'

  interface Props {
    technologies: Technology[]
  }
  defineProps<Props>()

  const icons: Record<string, SimpleIcon> = {
    django: siDjango,
    docker: siDocker,
    gnubash: siGnubash,
    javascript: siJavascript,
    latex: siLatex,
    markdown: siMarkdown,
    nuxtdotjs: siNuxtdotjs,
    python: siPython,
    readthedocs: siReadthedocs,
    tailwindcss: siTailwindcss,
    typescript: siTypescript,
    vuedotjs: siVuedotjs,
  }

  const getPaths = (technology: string): Path[] => [{
    d: icons[technology].path,
    'fill-rule': 'nonzero',
  }]
</script>

<template>
  <span>
    <span
      v-for="(technology) in technologies"
      :key="technology.name"
      class="mr-2 border-r border-neutral-200 pr-2 first-of-type:ml-0 last-of-type:mr-0 last-of-type:border-0 dark:border-neutral-900">
      <span
        class="inline-flex flex-row items-center gap-2">
        <Icon :paths="getPaths(technology.icon)" />
        <span class="sr-only sm:not-sr-only">{{ technology.name }}</span>
      </span>
    </span>
  </span>
</template>
