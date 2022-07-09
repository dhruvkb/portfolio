<!--
Renders an introduction and displays the Kaomoji above a certain breakpoint.
-->

<script setup lang="ts">
  import Kaomoji from '@/components/Kaomoji.vue'
  import SiteTitle from '@/components/SiteTitle.vue'
  import Subtitle from '@/components/Subtitle.vue'
</script>

<template>
  <section
    class="px-page"
    aria-label="Hello">
    <h1 class="normal-case">
      <Kaomoji
        client:load
        aria-hidden="true" />
      <span class="sr-only">Hello</span>
    </h1>

    <SiteTitle />

    <p class="mb-6 text-3xl leading-snug sm:text-4xl">
      <strong>software developer</strong> and
      <strong>open-source maintainer</strong>
      <span class="text-red-500">*</span>
    </p>

    <Subtitle client:load />
  </section>
</template>
