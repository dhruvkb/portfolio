import { Breakpoint } from '@/models/breakpoints'

/**
 * Describes the properties of a column in the resume table.
 */
export interface ColumnSpec {
  // the name of the key to access the cell from the data row
  code: string
  // the name of the column to show in the table header
  display: string

  // the lowest breakpoint at which the column appears
  breakpoint?: Breakpoint
  // the classes to apply to the column headers, specifically for width control
  classes?: string[]
  // the name of the Vue component to use to render the cell
  componentName?: string
}

export interface RowData<T extends string = string> {
  // whether to draw a separator below the row
  isLast: boolean
  // the mapping of column codes to cell content values
  data: { [code in T]: unknown }
}
