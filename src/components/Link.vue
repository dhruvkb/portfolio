<!--
Renders a link as a simple HTML anchor tag `<a>` with attributes based on
whether it points to an external resource or a router path. External links open
in a new tab without a referrer.
-->

<script setup lang="ts">
  import { usePage } from 'iles'
  import { computed } from 'vue'

  interface Props {
    dest: string
    label: string
    /**
     * the styling of the link; this can be one of three options:
     * - regular: font style and arrow
     * - plain: only arrow
     * - base: no style
     */
    variant?: 'regular' | 'plain' | 'base'
    title?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    variant: 'regular',
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
</script>

<template>
  <span class="group inline-flex flex-row items-center gap-1">
    <a
      class="hover:underline"
      :class="{
        'text-xs font-semibold uppercase': variant === 'regular',
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
      v-if="variant !== 'base'"
      class="text-base font-semibold text-red-500 transition-transform duration-100 group-hover:translate-x-1 printing:hidden"
      :class="{ 'group-hover:-translate-y-1': isExternal }"
      aria-hidden="true">
      {{ isExternal ? '↗' : '→' }}
    </span>
  </span>
</template>
