<!--
Renders a link as a simple HTML anchor tag `<a>` with attributes based on whether it points to an
external resource or a router path. External links open in a new tab without a referrer.
-->

<script setup lang="ts">
  import { usePage } from 'iles'
  import { computed } from 'vue'

  const arrows = {
    e: {
      glyph: '→',
      classes: ['group-hover:translate-x-1'],
    },
    ne: {
      glyph: '↗',
      classes: ['group-hover:translate-x-1', 'group-hover:-translate-y-1'],
    },
    s: {
      glyph: '↓',
      classes: ['group-hover:translate-y-1'],
    },
    none: undefined,
  } as const
  type ArrowStyle = keyof typeof arrows

  interface Props {
    dest: string
    label: string
    /**
     * whether to not apply the font styling in terms of size, weight and case
     */
    isPlain?: boolean
    /**
     * that direction of the arrow to display; useful if you want to change the depicted arrow or
     * remove it entirely
     */
    arrowStyle?: ArrowStyle
    title?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    arrowStyle: undefined,
    title: undefined,
  })

  const isExternal = computed(() => props.dest.startsWith('http'))

  const { frontmatter } = usePage()
  const isNav = computed(() => props.title !== undefined)
  const isActive = computed(() => frontmatter.title === props.title)

  const displayLink = computed(() => (isExternal.value ? props.dest.replace(/https?:\/\/(www.)?/g, '') : props.dest))

  const params = computed(() => (isExternal.value
    ? { target: '_blank', rel: 'noreferrer' }
    : { }))

  const arrow = computed(() => {
    if (props.arrowStyle) return arrows[props.arrowStyle]
    return isExternal.value ? arrows.ne : arrows.e
  })
</script>

<template>
  <span class="group inline-flex flex-row items-center gap-1">
    <a
      class="hover:underline"
      :class="{
        'text-xs font-semibold uppercase': !isPlain,
        'text-neutral-400 dark:text-neutral-600 underline hover:text-curr': isNav && isActive,
      }"
      v-bind="params"
      :href="dest"
      :aria-label="label">
      <slot>
        <span class="printing:hidden">Link</span>
        <code class="hidden printing:inline">{{ displayLink }}</code>
      </slot>
    </a>
    <span
      v-if="arrow"
      class="font-semibold text-red-500 transition-transform duration-100 printing:hidden"
      :class="arrow.classes"
      aria-hidden="true">
      {{ arrow.glyph }}
    </span>
  </span>
</template>
