<!--
Renders a link as a simple HTML anchor tag `<a>` with attributes based on whether it points to an
external resource or a router path. External links open in a new tab without a referrer.
-->

<script setup lang="ts">
  import { computed, useSlots } from 'vue'
  import type { RouteLocationRaw } from 'vue-router'

  import { ARROWS, type Arrow } from '@/constants/arrows'

  type LinkUrl = { dest: RouteLocationRaw; label: string }

  interface Props {
    /**
     * the combination of destination and label; Based on whether the target is
     * internal or external, the destination maps to the `href` attribute on the
     * anchor tag `<a>` or the `to` prop on the `RouterLink` component.
     */
    url: LinkUrl
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
     * whether to underline the textual content of the link
     */
    isUnderlined?: boolean
    /**
     * whether to emphasise the text on hover by increasing the contrast of the
     * text color with the background
     */
    isEmphasised?: boolean
    /**
     * the name of the arrow to render
     * - NORTHEAST: used for external links
     * - EAST: used for internal links and for next items such as blog post
     * - SOUTH: used for files that can be downloaded
     * - WEST: used for going back and for previous items such as blog post
     * - `null`: used to hide the arrow
     * - `undefined`: used to automatically determine an arrow based on the usage
     */
    arrow?: Arrow | null | undefined
  }
  const props = withDefaults(defineProps<Props>(), {
    isLowercase: true,
    isItalicised: true,
    isUnderlined: true,
    isEmphasised: true,
    arrow: undefined,
  })

  const dest = computed(() =>
    typeof props.url === 'string' ? props.url : props.url.dest
  )
  const label = computed(() =>
    typeof props.url === 'string' ? `Link to ${props.url}` : props.url.label
  )

  // If the link points to an external link or a file, use a regular anchor tag.
  const isExternal = computed(
    () => typeof dest.value === 'string' && dest.value.startsWith('http')
  )
  const isFile = computed(
    () => typeof dest.value === 'string' && dest.value.endsWith('.pdf')
  )

  const params = computed(() =>
    isExternal.value || isFile.value
      ? { href: dest.value, target: '_blank', rel: 'noreferrer' }
      : { to: dest.value }
  )

  const slots = useSlots()
  const arrow = computed(() => {
    if (slots.end) return undefined
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
    typeof dest.value === 'string'
      ? dest.value.replace(/https?:\/\/(www.)?/g, '')
      : String(dest.value)
  )
</script>

<template>
  <component
    :is="isExternal || isFile ? 'a' : 'RouterLink'"
    class="group"
    :class="{
      lowercase: isLowercase,
      'not-printing:hover:italic': isItalicised,
      'not-printing:underline': isUnderlined,
      'not-printing:hover:text-imp': isEmphasised,
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

    <slot name="end">
      <span
        v-if="arrow && arrow !== ARROWS.WEST"
        class="link-arrow ml-1"
        :class="arrow.classes"
        aria-hidden="true">
        {{ arrow.glyph }}
      </span>
    </slot>
  </component>
</template>

<style>
  .link-arrow {
    @apply inline-block font-sans font-semibold not-italic text-red-500 transition-transform duration-100 printing:hidden;
  }
</style>
