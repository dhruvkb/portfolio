<!--
Renders a funny, witty remark about me, as a person, or my profession, as a developer.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import { sample } from '@/utils/random'

  const subtitles = [
    'Also wears many other hats.',
    'Is a computer whisperer.',
    'Writes code; sometimes gets paid for it.',
    'Has talked to computers for over half his life.',
    'Designs his own websites.',
    'Crafts new and innovative bugs.',
  ]
  const subtitle = computed(() => sample(subtitles))
</script>

<template>
  <p class="mb-6 text-sm leading-snug">
    <span class="text-red-500">*</span>{{ subtitle }}
  </p>
</template>
