<script setup lang="ts">
  interface Props {
    code: string
    title?: string
    items: unknown[] // can be any list
  }
  defineProps<Props>()

  const hasName = (val: unknown): val is { name: string } => typeof val === 'object'
    && val !== null
    && 'name' in val
</script>

<template>
  <figure>
    <figcaption
      v-if="title"
      class="px-page border-b border-neutral-400 py-2 text-xs font-semibold uppercase text-neutral-400 printing:px-0 dark:border-neutral-600 dark:text-neutral-600">
      {{ title }}
    </figcaption>

    <ul class="divide-y divide-neutral-200 dark:divide-neutral-900">
      <li
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        class="py-1.5 printing:first:pt-0 printing:last:pb-0">
        <slot
          :name="code"
          :item="item">
          {{ hasName(item) ? item.name : typeof item }}
        </slot>
      </li>
    </ul>
  </figure>
</template>
