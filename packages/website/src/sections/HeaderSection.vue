<script setup lang="ts">
  import Link from '@/components/Link.vue'

  const home = {
    name: 'Home',
    dest: '/',
  }
  const navLinks = [
    {
      name: 'About',
      dest: { name: 'about' },
    },
    {
      name: 'Blog',
      dest: { name: 'blog' },
    },
    {
      name: 'Works',
      dest: { name: 'works' },
    },
    {
      name: 'Résumé',
      dest: { name: 'resume' },
    },
  ]
</script>

<template>
  <header class="flex flex-row items-center">
    <Link
      :dest="home.dest"
      :label="`${home.name} page`"
      exact-active-class="sr-only"
      :arrow="null"
      :is-italicised="false">
      <SiteTitle />
    </Link>

    <nav class="ml-auto">
      <ul class="flex flex-row items-center gap-4">
        <li
          v-for="link in navLinks"
          :key="link.name">
          <Link
            active-class="text-low"
            :dest="link.dest"
            :label="`Go to the '${link.name}' page`"
            :arrow="null">
            {{ link.name }}
          </Link>
        </li>
      </ul>
    </nav>
  </header>
</template>
