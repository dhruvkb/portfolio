import { computed, ref } from 'vue'

export const GRADIENT_PALETTES: [string, string][] = [
  ['from-red-500', 'to-fuchsia-500'],
  ['from-violet-500', 'to-blue-500'],
  ['from-blue-500', 'to-cyan-500'],
  ['from-cyan-500', 'to-lime-500'],
  ['from-lime-500', 'to-yellow-500'],
  ['from-yellow-500', 'to-orange-500'],
  ['from-orange-500', 'to-red-500'],
]

export const usePalette = () => {
  const $idx = ref(0)

  /**
   * Map any given integer to a number between 0 and the length of the gradient
   * palette list (exclusive).
   *
   * @param index - any integer given as the input number
   * @return a valid index in the `GRADIENT_PALETTES` list
   */
  const normaliseIndex = (index: number): number => {
    let normIdx = index
    if (normIdx < 0) normIdx += GRADIENT_PALETTES.length
    else normIdx %= GRADIENT_PALETTES.length
    return normIdx
  }

  const idx = computed({
    get: () => $idx.value,
    set: (val) => {
      $idx.value = normaliseIndex(val)
    },
  })

  const getPaletteClasses = (index: number) =>
    GRADIENT_PALETTES[normaliseIndex(index)]

  const paletteClasses = computed(() => GRADIENT_PALETTES[idx.value])

  return {
    idx,
    paletteClasses,
    getPaletteClasses,
  }
}
