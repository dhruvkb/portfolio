<!--
Renders a table based on the given column specification and dataset. Supports a
number of features such as columns showing above a certain breakpoint and
separators between row groups.
-->

<script setup lang="ts">
  import type { Breakpoint } from '@/models/breakpoints'
  import type { ColumnSpec, RowData } from '@/models/data_table'

  interface Props {
    title?: string
    columns: Readonly<ColumnSpec[]>
    groups: RowData[][]
  }
  defineProps<Props>()

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

  const isSimple = (val: unknown): val is string | number | boolean =>
    typeof val === 'undefined' ||
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean'
</script>

<template>
  <table
    class="w-full border-collapse transition-colors hover:text-neutral-400 dark:hover:text-neutral-600"
    :aria-label="title">
    <caption
      v-if="title"
      class="px-page py-1 text-left text-xs font-semibold uppercase text-neutral-400 dark:text-neutral-600">
      {{
        title
      }}
    </caption>

    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.code"
          :class="[
            column.breakpoint ? `hidden ${column.breakpoint}:table-cell` : '',
            ...(column.classes ?? []),
          ]"
          :aria-label="column.display"
          scope="col"
          class="first-of-type:pl-page last-of-type:pr-page box-content border-y border-neutral-400 px-1 py-2 text-left text-xs font-semibold uppercase text-neutral-400 dark:border-neutral-600 dark:text-neutral-600">
          {{ column.display }}
        </th>
      </tr>
    </thead>

    <tbody
      v-for="(group, groupIndex) in groups"
      :key="groupIndex"
      class="border-b border-neutral-200 text-lg duration-200 dark:border-neutral-900">
      <tr
        v-for="(row, rowIndex) in group"
        :key="rowIndex"
        class="hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-200">
        <component
          :is="index === 0 ? 'th' : 'td'"
          v-for="(column, index) in columns"
          :key="column.code"
          :scope="index === 0 ? 'row' : undefined"
          :class="getColumnVisibilityClasses(column.breakpoint)"
          class="first:pl-page last:pr-page p-1 text-left font-normal">
          <slot
            :name="column.code"
            :data="row[column.code]">
            {{
              isSimple(row[column.code])
                ? row[column.code]
                : typeof row[column.code]
            }}
          </slot>
        </component>
      </tr>
    </tbody>
  </table>
</template>
