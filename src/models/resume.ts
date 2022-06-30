import type { Bio } from '@/models/bio'
import type { EpicJson } from '@/models/project'
import type { OrgJson } from '@/models/role'

/* JSON models */

export interface ResumeItemJson {
  name: string
  id: string
}

/* JS models */

// Use interface/class merging to avoid declaring variables again.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResumeItem extends ResumeItemJson {}

export class ResumeItem {
  constructor(resumeItemJson: ResumeItemJson) {
    this.name = resumeItemJson.name
    this.id = resumeItemJson.id
  }
}

// TODO: Move to Réschumé
export interface Resume {
  bio: Bio
  projects: EpicJson[]
  roles: OrgJson[]
}
