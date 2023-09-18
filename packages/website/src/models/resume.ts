export class ResumeItem {
  id: string
  name: string

  constructor(resumeItemJson: { id: string; name: string }) {
    this.id = resumeItemJson.id
    this.name = resumeItemJson.name
  }
}
