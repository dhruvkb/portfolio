<!--
Renders the site-title and the kaomoji.
-->

<script setup lang="ts">
  import Kaomoji from '@/components/Kaomoji.vue'
  import SiteTitle from '@/components/SiteTitle.vue'
  import Subtitle from '@/components/Subtitle.vue'
</script>

<template>
  <section aria-label="Hello">
    <!-- Using `h-5` to prevent layout shift when `Kaomoji` is loaded on the client. -->
    <h2 class="h-5 normal-case">
      <Kaomoji client:load />
      <span class="sr-only">Hello</span>
    </h2>

    <SiteTitle class="text-3xl printing:text-2xl printing:leading-snug sm:text-4xl lg:text-5xl" />

    <p class="body-text mb-6 max-w-text printing:mb-0 printing:text-xl">
      <strong>software developer</strong> and
      <strong>open-source maintainer</strong>
      <span class="text-red-500 printing:hidden">*</span>
    </p>

    <Subtitle
      client:load
      class="printing:hidden" />
  </section>
</template>
