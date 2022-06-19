<!--
Renders an introduction and displays the Kaomoji above a certain breakpoint.
-->

<script setup lang="ts">
  import Kaomoji from '@/components/Kaomoji.vue'
</script>

<template>
  <section
    class="px-page"
    aria-label="Hello">
    <h1 class="ps-2 lg:ps-4 normal-case">
      <Kaomoji aria-hidden="true" />
      <span class="sr-only">Hello</span>
    </h1>

    <p class="gradient-text inline-block from-red-500 to-fuchsia-500 text-3xl leading-snug text-tx selection:bg-neutral-200 selection:text-red-500 dark:selection:bg-neutral-900 sm:text-4xl">
      <span class="font-black">dhruv</span>
      <span>kb</span>
    </p>

    <p class="mb-6 text-3xl leading-snug sm:text-4xl">
      <strong>software developer</strong> and
      <strong>open-source maintainer</strong>
      <span class="text-red-500">*</span>
    </p>

    <p class="text-sm leading-snug">
      <span class="text-red-500">*</span>Also wears many other hats.
    </p>
  </section>
</template>
