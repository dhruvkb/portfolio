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
  const getPaletteClasses = (index: number) =>
    GRADIENT_PALETTES.at(index % GRADIENT_PALETTES.length) ??
    GRADIENT_PALETTES[0]

  const idx = ref(0)
  const paletteClasses = computed(() => getPaletteClasses(idx.value))

  return {
    idx,
    paletteClasses,
    getPaletteClasses,
  }
}
