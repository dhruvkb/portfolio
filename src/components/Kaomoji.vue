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
  <span>{{ face }}</span>
</template>
