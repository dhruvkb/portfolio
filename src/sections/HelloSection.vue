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

    <div class="mb-ln flex flex-row items-start printing:mb-0">
      <SiteTitle
        is-ascii
        changes-color
        client:load />
      <!-- reference to the `<Subtitle>` component -->
      <span
        class="text-red-500 printing:hidden"
        aria-hidden="true"
        >*</span
      >
    </div>

    <p class="mb-ln max-w-text printing:mb-0 printing:text-xl">
      <strong class="not-printing:hover:font-black">software developer</strong>
      and
      <strong class="not-printing:hover:font-black"
        >open-source maintainer</strong
      >
    </p>

    <Subtitle
      client:load
      class="printing:hidden" />
  </section>
</template>
