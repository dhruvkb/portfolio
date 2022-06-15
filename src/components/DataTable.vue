<!--
Renders a table based on the given column specification and dataset. Supports a
number of features such as columns showing above a certain breakpoint and
separators between row groups.
-->

<script setup lang="ts">
  import { PropType } from 'vue'
  import type { Component } from 'vue'

  import { Breakpoint } from '@/models/breakpoints'
  import { ColumnSpec, RowData } from '@/models/data_table'

  import HandleCell from '@/components/HandleCell.vue'
  import OrganisationCell from '@/components/OrganisationCell.vue'
  import PeriodCell from '@/components/PeriodCell.vue'
  import TechStackCell from '@/components/TechStackCell.vue'

  defineProps({
    title: {
      type: String,
      default: undefined,
    },
    columns: {
      // Using `Readonly` because it has been defined with `as const`.
      type: Array as PropType<Readonly<ColumnSpec[]>>,
      default: () => [],
    },
    rows: {
      type: Array as PropType<RowData[]>,
      default: () => [],
    },
  })

  // Used for dynamically-rendered components.
  const components: Record<string, Component> = {
    Handle: HandleCell,
    Organisation: OrganisationCell,
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
  <table class="w-full border-collapse">
    <caption
      v-if="title"
      class="px-page border-b border-neutral-200 py-1 text-left text-xs font-semibold uppercase text-neutral-400 dark:border-neutral-900 dark:text-neutral-600">
      {{ title }}
    </caption>

    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.code"
          :class="column.breakpoint ? `hidden ${column.breakpoint}:table-cell` : ''"
          class="first-of-type:pl-page last-of-type:pr-page border-b border-neutral-400 px-1 py-2 text-left text-xs font-semibold uppercase text-neutral-400 dark:border-neutral-600 dark:text-neutral-600">
          {{ column.display }}
        </th>
      </tr>
    </thead>

    <tbody class="text-lg transition-colors duration-200 hover:text-neutral-400 dark:hover:text-neutral-600">
      <tr
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="transition-colors duration-200 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
        :class="{'border-b border-neutral-200 dark:border-neutral-900': row.isLast }">
        <td
          v-for="column in columns"
          :key="column.code"
          :class="getColumnVisibilityClasses(column.breakpoint)"
          class="first-of-type:pl-page last-of-type:pr-page p-1">
          <component
            :is="components[column.componentName]"
            v-if="column.componentName"
            v-bind="row.data[column.code]" />
          <template v-else>
            {{ row.data[column.code] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
