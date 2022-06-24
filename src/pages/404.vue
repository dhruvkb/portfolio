<page>
  title: 404 Not Found
</page>

<script setup lang="ts">
  import Link from '@/components/Link.vue'
  import SiteTitle from '@/components/SiteTitle.vue'
</script>

<template>
  <main class="px-page flex min-h-screen flex-col items-center gap-6 pts-8 pbs-8 lg:pts-12 lg:pbs-12">
    <!-- `mt-9` places header at same position as the homepage. -->
    <Link
      class="mt-9 self-start"
      label="Homepage"
      dest="/"
      variant="base">
      <SiteTitle />
    </Link>
    <div class="my-auto">
      <h2 class="my-auto text-9xl font-black">
        404
      </h2>
      <p class="mb-6 text-lg">
        You seem
        <span class="text-neutral-900 dark:text-neutral-200">lost</span>.
      </p>
      <Link
        label="Homepage"
        dest="/">
        Go back?
      </Link>
    </div>
  </main>
</template>
