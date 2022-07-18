<!--
Renders a funny, witty remark about me, as a person, or my profession, as a developer.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import { sample } from '@/utils/random'

  const subtitles = [
    'Also wears many other hats.',
    'Is a computer whisperer.',
    'Designs his own websites.',
    'Crafts new and innovative <s>apps</s> bugs.',
    'Has talked to computers for over half his life.',
    'Writes code; <em>sometimes</em> gets paid for it.',
  ]
  const subtitle = computed(() => sample(subtitles))
</script>

<template>
  <p class="mb-6 text-sm">
    <span class="text-red-500">*</span>
    <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
    <span v-html="subtitle" />
    <!-- eslint-enable vue/no-v-html -->
  </p>
</template>
