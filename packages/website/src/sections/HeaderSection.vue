<script setup lang="ts">
  import Link from '@/components/Link.vue'

  const navLinks = [
    {
      name: 'About',
      pageKey: 'about',
    },
    {
      name: 'Blog',
      pageKey: 'blog',
    },
    {
      name: 'Works',
      pageKey: 'works',
    },
    {
      name: 'Résumé',
      pageKey: 'resume',
    },
  ].map((link) => ({
    name: link.name,
    url: {
      dest: { name: link.pageKey },
      label: `Go to the '${link.name}' page`,
    },
  }))
</script>

<template>
  <header class="flex flex-row items-center">
    <Link
      :url="{
        dest: '/',
        label: `Home page`,
      }"
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
            :url="link.url"
            :arrow="null">
            {{ link.name }}
          </Link>
        </li>
      </ul>
    </nav>
  </header>
</template>
