<!--
Renders the footer with some important links and a 'Thank you' note.
-->

<script setup lang="ts">
  import Link from '@/components/Link.vue'
  import type { Breakpoint } from '@/models/breakpoints'

  const breakpointClasses: Record<Breakpoint | 'mob', string> = {
    /*
     Since Tailwind is mobile-first, 'mob' isn't a real breakpoint.
     See https://tailwindcss.com/docs/responsive-design#mobile-first
     */
    mob: 'sm:hidden',
    sm: 'hidden sm:inline md:hidden',
    md: 'hidden md:inline lg:hidden',
    lg: 'hidden lg:inline',
  }

  const isDev = import.meta.env.DEV
</script>

<template>
  <footer class="flex flex-row items-center justify-between pt-ln">
    <!-- Using italics so that the font is already loaded. -->
    <div class="italic text-low">
      <template v-if="isDev">
        <span
          v-for="(classes, breakpoint) in breakpointClasses"
          :key="breakpoint"
          :class="classes">
          breakpoint: {{ breakpoint }}
        </span>
      </template>

      <template v-else>Thanks for visiting!</template>
    </div>

    <Link
      :url="{
        label: 'Source code for this website',
        dest: 'https://github.com/dhruvkb/portfolio',
      }"
      >Source code</Link
    >
  </footer>
</template>
