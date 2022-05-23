<script setup lang="ts">
  import { computed, PropType } from 'vue'

  const props = defineProps({
    mood: {
      type: String as PropType<'happy' | 'confused'>,
      default: 'happy',
    },
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

  const sample = <T>(array: T[]): T => {
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
  <span aria-hidden="true">{{ face }}</span>
</template>
