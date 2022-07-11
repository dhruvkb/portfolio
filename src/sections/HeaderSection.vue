<script setup lang="ts">
  import { usePage } from 'iles'
  import { computed } from 'vue'

  import Link from '@/components/Link.vue'

  const home = {
    name: 'Home',
    dest: '/',
  }
  const navLinks = [
    {
      name: 'Résumé',
      dest: 'resume',
    },
    {
      name: 'About',
      dest: 'about',
    },
  ]

  const { frontmatter } = usePage()
  const isHome = computed(() => frontmatter.title === 'Home')
</script>

<template>
  <header class="px-page flex flex-row items-center justify-between">
    <Link
      variant="base"
      :dest="home.dest"
      :label="`${home.name} page`">
      <h1 class="text-xl sm:text-2xl">
        <SiteTitle
          :class="{ 'hidden': isHome }"
          aria-hidden="true" />
        <span class="sr-only">Dhruv Bhanushali</span>
      </h1>
    </Link>

    <nav>
      <ul class="flex flex-row items-center gap-4">
        <li
          v-for="link in navLinks"
          :key="link.name">
          <Link
            class="text-xl font-medium lowercase sm:text-2xl"
            variant="base"
            :title="link.name"
            :label="`${link.name} page`"
            :dest="link.dest">
            {{ link.name }}
          </Link>
        </li>
      </ul>
    </nav>
  </header>
</template>
