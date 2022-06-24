<!--
Renders the footer with some important links and a 'Thank you' note.
-->

<script setup lang="ts">
  import type { Breakpoint } from '@/models/breakpoints'

  import Link from '@/components/Link.vue'

  const breakpointClasses: Record<Breakpoint | 'mob', string> = {
    /*
     Since Tailwind is mobile-first, 'mob' isn't a real breakpoint.
     See https://tailwindcss.com/docs/responsive-design#mobile-first
     */
    mob: 'sm:hidden',
    sm: 'hidden sm:inline md:hidden',
    md: 'hidden md:inline lg:hidden',
    lg: 'hidden lg:inline xl:hidden',
    xl: 'hidden xl:inline 2xl:hidden',
    '2xl': 'hidden 2xl:inline',
  }

  const isDev = import.meta.env.DEV
  const isProd = import.meta.env.PROD
</script>

<template>
  <footer class="px-page flex flex-row items-center justify-between">
    <div
      class="text-sm text-neutral-400 dark:text-neutral-600">
      <template v-if="isDev">
        <span
          v-for="(classes, breakpoint) in breakpointClasses"
          :key="breakpoint"
          :class="classes">
          breakpoint: {{ breakpoint }}
        </span>
      </template>

      <template v-if="isProd">
        Thanks for visiting!
      </template>
    </div>

    <Link
      label="Source code for this website"
      dest="https://github.com/dhruvkb/portfolio">
      Source code
    </Link>
  </footer>
</template>
