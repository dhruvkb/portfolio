import type { Project as RcvProject } from 'recivi'

import type { Epic } from '@/resume/epic'
import type { Featured } from '@/resume/featured'

export interface Project extends RcvProject {}

export class Project {
  /**
   * reference to the parent epic
   */
  epic: Epic

  /**
   * whether the project is featured
   */
  isFeatured: boolean

  constructor(epic: Epic, projectJson: RcvProject, featured: Featured) {
    Object.assign(this, projectJson)
    this.epic = epic
    this.isFeatured =
      this.epic.id in featured.creations &&
      featured.creations[this.epic.id].includes(this.id)
  }
}
