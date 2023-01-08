<!--
Renders a link as a simple HTML anchor tag `<a>` with attributes based on whether it points to an
external resource or a router path. External links open in a new tab without a referrer.
-->

<script setup lang="ts">
  import { usePage } from 'iles'
  import { computed } from 'vue'

  const ARROWS = {
    NORTHEAST: {
      glyph: '↗',
      classes: ['group-hover:translate-x-1', 'group-hover:-translate-y-1'],
    },
    EAST: {
      glyph: '→',
      classes: ['group-hover:translate-x-1'],
    },
    SOUTH: {
      glyph: '↓',
      classes: ['group-hover:translate-y-1'],
    },
  } as const

  interface Props {
    /**
     * the actual target to which the link points, analogous to the `href`
     * attribute on the anchor tag `<a>`
     */
    dest: string
    label: string
    /**
     * the title of the page as per the frontmatter, used by internal links to
     * identify the active page
     */
    pageTitle?: string | undefined
    /**
     * selectively enable features provided by this component; The available
     * features are
     * - italics: italicise text on hover
     * - arrow: show an arrow after the link
     */
    features?: string[]
  }
  const props = withDefaults(defineProps<Props>(), {
    pageTitle: undefined,
    features: () => ['lowercase', 'italics', 'arrow'],
  })

  const isExternal = computed(() => props.dest.startsWith('http'))
  const isFile = computed(() => props.dest.endsWith('.pdf'))
  const arrow = computed(() => {
    if (!props.features.includes('arrow')) return undefined
    if (isFile.value) return ARROWS.SOUTH
    if (isExternal.value) return ARROWS.NORTHEAST
    return ARROWS.EAST
  })

  const { frontmatter } = usePage()
  const isNav = computed(() => props.pageTitle !== undefined)
  const isActive = computed(() => props.pageTitle === frontmatter.title)

  /**
   * the actual URL, with the initial `https://www.` part, and variations
   * thereof, stripped out
   */
  const displayLink = computed(() =>
    isExternal.value
      ? props.dest.replace(/https?:\/\/(www.)?/g, '')
      : props.dest
  )

  const params = computed(() =>
    isExternal.value ? { target: '_blank', rel: 'noreferrer' } : {}
  )
</script>

<template>
  <a
    class="group not-printing:underline not-printing:hover:text-neutral-900 dark:not-printing:hover:text-neutral-200"
    :class="{
      // Active link is dimmed in the nav bar.
      'text-neutral-400 dark:text-neutral-600': isNav && isActive,
      // Allow opting-out of lowercase text.
      lowercase: features.includes('lowercase'),
      // Allow opting-out of italics-on-hover.
      'not-printing:hover:italic': features.includes('italics'),
    }"
    v-bind="params"
    :href="dest"
    :aria-label="label">
    <slot>
      <span class="printing:hidden">Link</span>
      <code class="not-printing:hidden">{{ displayLink }}</code>
    </slot>
    <span
      v-if="arrow"
      class="ml-1 inline-block font-semibold text-red-500 transition-transform duration-100 printing:hidden"
      :class="arrow.classes"
      aria-hidden="true">
      {{ arrow.glyph }}
    </span>
  </a>
</template>
