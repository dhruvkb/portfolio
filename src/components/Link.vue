<!--
Renders a link as a simple HTML anchor tag `<a>` or a `RouterLink` based on
whether it points to an external resource or a router path. External links open
in a new tab without a referrer.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import { RouterLink } from 'vue-router'

  interface Props {
    dest: string
    label: string
    isPlain?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPlain: false,
  })

  const isExternal = computed(() => props.dest.startsWith('http'))

  const params = isExternal.value
    ? { href: props.dest } // anchor tag uses `href` attribute
    : { to: { name: props.dest } } // `RouterLink` uses `to` prop
</script>

<template>
  <div class="group inline-flex flex-row items-center gap-1">
    <component
      :is="isExternal ? 'a': RouterLink"
      class="hover:underline"
      :class="{ 'text-xs font-semibold uppercase': !isPlain }"
      v-bind="params"
      :aria-label="label"
      target="_blank"
      rel="noreferrer">
      <slot>
        Link
      </slot>
    </component>
    <span
      class="text-base font-semibold text-red-500 transition-transform duration-100 group-hover:translate-x-1"
      :class="{ 'group-hover:-translate-y-1': isExternal }"
      aria-hidden="true">
      {{ isExternal ? '↗' : '→' }}
    </span>
  </div>
</template>
