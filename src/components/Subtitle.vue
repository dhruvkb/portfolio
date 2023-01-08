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
    'Knows how to exit vim.',
    'Occasionally finishes a side-project.',
  ]
  const subtitle = computed(() => sample(subtitles))
</script>

<template>
  <p>
    <span class="text-red-500">*</span>
    <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
    <span v-html="subtitle" />
    <!-- eslint-enable vue/no-v-html -->
  </p>
</template>
