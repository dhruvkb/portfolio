<!--
Draws a face to the screen consisting of CJK characters.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import { sample } from '@/utils/random'

  const edgePairs: [string, string][] = [
    ['(', ')'],
    ['[', ']'],
  ]
  const eyePairs: [string, string][] = [
    ['ˇ', 'ˇ'],
    ['❛', '❛'],
    ['^', '^'],
    ['＾', '＾'],
    ['´•', '•`'],
    ['◕', '◕'],
  ]
  const mouths: string[] = ['◡', 'ᴗ', '▽', 'ヮ']
  const hands: string[] = ['ﾉ', 'ノ', 'ﾉﾟ', '◞*']

  const face = computed(() => {
    const [edgeLeft, edgeRight] = sample(edgePairs) ?? ['', '']
    const [eyeLeft, eyeRight] = sample(eyePairs) ?? ['', '']
    const mouth = sample(mouths) ?? ''
    const hand = sample(hands) ?? ''

    return [edgeLeft, eyeLeft, mouth, eyeRight, edgeRight, hand].join('')
  })
</script>

<template>
  <span aria-hidden="true">
    <span class="printing:hidden">{{ face }}</span>
    <!-- Lock down the face printed on the resume. -->
    <span class="hidden printing:inline">(´•ヮ•`)ノ</span>
  </span>
</template>
