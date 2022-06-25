/* JSON models */

export interface ResumeItemJson {
  name: string
  slug: string
}

/* JS models */

// Use interface/class merging to avoid declaring variables again.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResumeItem extends ResumeItemJson {}

export class ResumeItem {
  constructor(resumeItemJson: ResumeItemJson) {
    this.name = resumeItemJson.name
    this.slug = resumeItemJson.slug
  }
}
