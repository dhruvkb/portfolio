import { Breakpoint } from '@/models/breakpoints'

export interface FsNode {
  name: string
  aliases: string[]
}

export interface ResumeNodeJson {
  name: string
  slug: string

  node: FsNode
}

export class ResumeNode implements ResumeNodeJson {
  name: string
  slug: string

  node: FsNode

  constructor(node: ResumeNodeJson) {
    this.name = node.name
    this.slug = node.slug

    this.node = node.node
  }
}

/**
 * Describes the properties of a column in the resume table.
 */
export interface ColumnSpec {
  code: string
  display: string

  breakpoint?: Breakpoint
  componentName?: string
}

export interface RowData<T extends string = string> {
  isLast: boolean
  data: { [code in T]: unknown }
}
