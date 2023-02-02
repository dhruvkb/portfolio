<!--
Renders a link as a simple HTML anchor tag `<a>` with attributes based on whether it points to an
external resource or a router path. External links open in a new tab without a referrer.
-->

<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterLink, type RouteLocationRaw } from 'vue-router'

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
    WEST: {
      glyph: '←',
      classes: ['group-hover:-translate-x-1'],
    },
  } as const
  type Arrow = keyof typeof ARROWS

  interface Props {
    /**
     * the actual target to which the link points, maps to the `href` attribute
     * on the anchor tag `<a>` or the `to` prop of a `RouterLink`
     */
    dest: RouteLocationRaw
    label: string
    /**
     * whether to lowercase the textual content of the link
     */
    isLowercase?: boolean
    /**
     * whether to display the textual content of the link in italic type when
     * hovered with a mouse
     */
    isItalicised?: boolean
    /**
     * the name of the arrow to render
     * - NORTHEAST: used for external links
     * - EAST: used for internal links and for next items such as blog post
     * - SOUTH: used for files that can be downloaded
     * - WEST: used for going back and for previous items such as blog post
     * - `null`: used to hide the arrow
     * - `undefined`: used to automatically determine an arrow based on the usage
     */
    arrow?: Arrow | null
  }
  const props = withDefaults(defineProps<Props>(), {
    isLowercase: true,
    isItalicised: true,
    arrow: undefined,
  })

  // If the link points to an external link or a file, use a regular anchor tag.
  const isExternal = computed(
    () => typeof props.dest === 'string' && props.dest.startsWith('http')
  )
  const isFile = computed(
    () => typeof props.dest === 'string' && props.dest.endsWith('.pdf')
  )

  const params = computed(() =>
    isExternal.value || isFile.value
      ? { href: props.dest, target: '_blank', rel: 'noreferrer' }
      : { to: props.dest }
  )

  const arrow = computed(() => {
    if (props.arrow === null) return undefined
    if (props.arrow !== undefined) return ARROWS[props.arrow]
    if (isFile.value) return ARROWS.SOUTH
    if (isExternal.value) return ARROWS.NORTHEAST
    return ARROWS.EAST
  })

  /**
   * the actual URL, with the initial `https://www.` part, and variations
   * thereof, stripped out
   */
  const displayLink = computed(() =>
    typeof props.dest === 'string'
      ? props.dest.replace(/https?:\/\/(www.)?/g, '')
      : String(props.dest)
  )
</script>

<template>
  <component
    :is="isExternal || isFile ? 'a' : RouterLink"
    class="group not-printing:underline not-printing:hover:text-imp"
    :class="{
      lowercase: isLowercase,
      'not-printing:hover:italic': isItalicised,
    }"
    v-bind="params"
    :aria-label="label">
    <span
      v-if="arrow === ARROWS.WEST"
      class="link-arrow mr-1"
      :class="arrow.classes"
      aria-hidden="true">
      {{ arrow.glyph }}
    </span>

    <slot>
      <span class="printing:hidden">Link</span>
      <code class="not-printing:hidden">{{ displayLink }}</code>
    </slot>

    <span
      v-if="arrow && arrow !== ARROWS.WEST"
      class="link-arrow ml-1"
      :class="arrow.classes"
      aria-hidden="true">
      {{ arrow.glyph }}
    </span>
  </component>
</template>

<style>
  .link-arrow {
    @apply inline-block font-sans font-semibold not-italic text-red-500 transition-transform duration-100 printing:hidden;
  }
</style>
