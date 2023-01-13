<!--
Renders a list of card components.
-->

<script lang="ts">
  import { defineComponent, type PropType } from 'vue'

  class DataDeckFactory<T = unknown> {
    // eslint-disable-next-line class-methods-use-this
    define() {
      return defineComponent({
        name: 'DataDeck',
        props: {
          title: {
            type: String,
            default: undefined,
          },
          code: {
            type: String,
            required: true,
          },
          items: {
            type: Array as PropType<T[]>,
            default: () => [],
          },
        },
        setup() {
          const hasName = (val: unknown): val is { name: string } =>
            typeof val === 'object' && val !== null && 'name' in val

          return {
            hasName,
          }
        },
      })
    }
  }

  const main = new DataDeckFactory().define()

  export function GenericDataDeck<T>() {
    return main as ReturnType<DataDeckFactory<T>['define']>
  }

  export default main
</script>

<template>
  <figure class="h-full">
    <figcaption
      v-if="title"
      class="border-b border-low font-semibold lowercase text-low">
      {{ title }}
    </figcaption>

    <ul class="divide-y divide-hl">
      <li
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        class="mt-1 pt-1 printing:mt-2 printing:pt-2 printing:first:mt-0 printing:first:pt-0">
        <slot
          :name="code"
          :item="item">
          {{ hasName(item) ? item.name : typeof item }}
        </slot>
      </li>
    </ul>
  </figure>
</template>
