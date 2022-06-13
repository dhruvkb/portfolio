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
