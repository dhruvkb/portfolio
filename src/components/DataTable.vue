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
    class="w-full border-collapse transition-colors hover:text-low"
    :aria-label="title">
    <caption
      v-if="title"
      class="text-left font-semibold lowercase text-low">
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
          class="box-content border-y border-low px-ch text-left font-semibold lowercase text-low first-of-type:pl-0 last-of-type:pr-0">
          {{ column.display }}
        </th>
      </tr>
    </thead>

    <tbody
      v-for="(group, groupIndex) in groups"
      :key="groupIndex"
      class="border-b border-hl duration-200">
      <tr
        v-for="(row, rowIndex) in group"
        :key="rowIndex"
        class="hover:bg-hl hover:text-imp">
        <component
          :is="index === 0 ? 'th' : 'td'"
          v-for="(column, index) in columns"
          :key="column.code"
          :scope="index === 0 ? 'row' : undefined"
          :class="getColumnVisibilityClasses(column.breakpoint)"
          class="px-ch py-1 text-left font-normal first:pl-0 last:pr-0">
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
