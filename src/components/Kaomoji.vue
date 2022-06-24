<!--
Draws a face to the screen consisting of CJK characters.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    mood?: 'happy' | 'confused'
  }
  const props = withDefaults(defineProps<Props>(), {
    mood: 'happy',
  })

  const edgePairs: [string, string][] = [
    ['(', ')'],
    ['[', ']'],
  ]
  let eyePairs: [string, string][]
  let mouths: string[]
  let hands: string[]

  switch (props.mood) {
    case 'happy':
      eyePairs = [
        ['ˇ', 'ˇ'],
        ['❛', '❛'],
        ['^', '^'],
        ['＾', '＾'],
        ['´•', '•`'],
        ['◕', '◕'],
      ]
      mouths = ['◡', 'ᴗ', '▽', 'ヮ']
      hands = ['ﾉ', 'ノ', 'ﾉﾟ', '◞*']
      break
    case 'confused':
      eyePairs = [
        ['・', '・'],
        ['-', '-'],
        ['｀', '´'],
        ['৺ੋ', '৺ੋ'],
        ['-᷅', '-᷄๑'],
        ['﹒︠', '﹒︡'],
      ]
      mouths = ['_', 'д', '∧', '௦', '₋']
      hands = ['ヾ', 'ゞ゛', 'ゞ']
      break
    default:
      eyePairs = []
      mouths = []
      hands = []
  }

  const sample = <T, >(array: T[]): T => {
    const len = array.length
    return array[Math.floor(Math.random() * len)]
  }

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
