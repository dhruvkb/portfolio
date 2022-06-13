<!--
Renders an introduction and displays the Kaomoji above a certain breakpoint.
-->

<script setup lang="ts">
  import Kaomoji from '@/components/Kaomoji.vue'
</script>

<template>
  <div class="px-page">
    <h1 class="ps-2 lg:ps-4">
      Hello!
    </h1>

    <div class="grid grid-cols-1 gap-16 md:grid-cols-2">
      <p class="text-3xl leading-snug sm:text-4xl">
        I'm <span class="site-title">Dhruv Bhanushali</span>, a
        <strong>software developer</strong> and
        <strong>open-source maintainer</strong> who also wears many other hats.
      </p>

      <Kaomoji class="self-center justify-self-center text-4xl" />
    </div>
  </div>
</template>
