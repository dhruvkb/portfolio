<!--
Renders a table based on the given column specification and dataset. Supports a
number of features such as columns showing above a certain breakpoint and
separators between row groups.
-->

<script setup lang="ts">
  import type { Component } from 'vue'

  import type { Breakpoint } from '@/models/breakpoints'
  import type { ColumnSpec, RowData } from '@/models/data_table'

  import BrandCell from '@/cells/BrandCell.vue'
  import PeriodCell from '@/cells/PeriodCell.vue'
  import TechStackCell from '@/cells/TechStackCell.vue'

  import LinkCell from '@/components/Link.vue' // Link

  interface Props {
    title?: string
    columns: Readonly<ColumnSpec[]>
    rows: RowData[]
  }
  defineProps<Props>()

  // Used for dynamically-rendered components.
  const components: Record<string, Component> = {
    Brand: BrandCell,
    Link: LinkCell,
    Period: PeriodCell,
    TechStack: TechStackCell,
  }

  const getColumnVisibilityClasses = (breakpoint?: Breakpoint): string[] => {
    if (!breakpoint) return []

    const classes = ['hidden']
    const breakpointClasses: Record<Breakpoint, string> = {
      sm: 'sm:table-cell',
      md: 'md:table-cell',
      lg: 'lg:table-cell',
      xl: 'xl:table-cell',
      '2xl': '2xl:table-cell',
    }
    classes.push(breakpointClasses[breakpoint])
    return classes
  }
</script>

<template>
  <table
    class="w-full border-collapse"
    :aria-label="title">
    <caption
      v-if="title"
      class="px-page py-1 text-left text-xs font-semibold uppercase text-neutral-400 dark:text-neutral-600">
      {{ title }}
    </caption>

    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.code"
          :class="[column.breakpoint ? `hidden ${column.breakpoint}:table-cell` : '', ...(column.classes ?? [])]"
          :aria-label="column.display"
          scope="col"
          class="first-of-type:pl-page last-of-type:pr-page box-content border-y border-neutral-400 px-1 py-2 text-left text-xs font-semibold uppercase text-neutral-400 dark:border-neutral-600 dark:text-neutral-600">
          {{ column.display }}
        </th>
      </tr>
    </thead>

    <tbody class="text-lg transition-colors duration-200 hover:text-neutral-400 dark:hover:text-neutral-600">
      <tr
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="border-b transition-colors duration-200 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
        :class="row.isLast ? 'border-neutral-200 dark:border-neutral-900' : 'border-white dark:border-black'">
        <component
          :is="index === 0 ? 'th' : 'td'"
          v-for="(column, index) in columns"
          :key="column.code"
          :scope="index === 0 ? 'row' : undefined"
          :class="getColumnVisibilityClasses(column.breakpoint)"
          class="first:pl-page last:pr-page p-1 text-left font-normal">
          <component
            :is="components[column.componentName]"
            v-if="column.componentName"
            v-bind="row.data[column.code]" />
          <template v-else>
            {{ row.data[column.code] }}
          </template>
        </component>
      </tr>
    </tbody>
  </table>
</template>
