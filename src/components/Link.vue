<!--
Renders a link as a simple HTML anchor tag `<a>` or a `RouterLink` based on
whether it points to an external resource or a router path. External links open
in a new tab without a referrer.
-->

<script setup lang="ts">
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
  }
  const props = withDefaults(defineProps<Props>(), {
    variant: 'regular',
  })

  const isExternal = computed(() => props.dest.startsWith('http'))

  const params = computed(() => (isExternal.value
    ? { target: '_blank', rel: 'noreferrer' }
    : { }))
</script>

<template>
  <div class="group inline-flex flex-row items-center gap-1">
    <a
      class="hover:underline"
      :class="{ 'text-xs font-semibold uppercase': variant === 'regular' }"
      v-bind="params"
      :href="dest"
      :aria-label="label">
      <slot>
        Link
      </slot>
    </a>
    <span
      v-if="variant !== 'base'"
      class="text-base font-semibold text-red-500 transition-transform duration-100 group-hover:translate-x-1"
      :class="{ 'group-hover:-translate-y-1': isExternal }"
      aria-hidden="true">
      {{ isExternal ? '↗' : '→' }}
    </span>
  </div>
</template>
