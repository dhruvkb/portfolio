export interface NodeIdentity {
  name: string
  aliases: string[]
}

/* JSON models */

export interface ResumeItemJson {
  name: string
  slug: string

  node: NodeIdentity
}

/* JS models */

// Use interface/class merging to avoid declaring variables again.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResumeItem extends ResumeItemJson {}

export class ResumeItem {
  constructor(resumeItemJson: ResumeItemJson) {
    this.name = resumeItemJson.name
    this.slug = resumeItemJson.slug

    this.node = resumeItemJson.node
  }
}
