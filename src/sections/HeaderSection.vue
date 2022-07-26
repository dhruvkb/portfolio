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
      name: 'About',
      dest: 'about',
    },
    {
      name: 'Works',
      dest: 'works',
    },
    {
      name: 'Résumé',
      dest: 'resume',
    },
  ]

  const { frontmatter } = usePage()
  const isHome = computed(() => frontmatter.title === 'Home')
</script>

<template>
  <header class="px-page flex flex-row items-center justify-between">
    <Link
      :dest="home.dest"
      :label="`${home.name} page`"
      arrow-style="none"
      is-plain>
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
            :title="link.name"
            :dest="link.dest"
            :label="`${link.name} page`"
            arrow-style="none"
            is-plain>
            {{ link.name }}
          </Link>
        </li>
      </ul>
    </nav>
  </header>
</template>
