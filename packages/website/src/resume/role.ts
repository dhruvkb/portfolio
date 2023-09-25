import type { Role as RcvRole } from 'recivi'

import type { Epic } from '@/resume/epic'
import type { Featured } from '@/resume/featured'
import type { Org } from '@/resume/org'

export interface Role extends RcvRole {}

export class Role {
  /**
   * reference to the parent org
   */
  org: Org

  /**
   * the list of epics that were created or worked on during this role; A role
   * may not have any associated epics.
   */
  epics: Epic[]

  /**
   * whether the role is featured
   */
  isFeatured: boolean

  constructor(org: Org, roleJson: RcvRole, featured: Featured) {
    Object.assign(this, roleJson)
    this.org = org
    this.isFeatured =
      this.org.id in featured.work &&
      featured.work[this.org.id].includes(this.id)
    this.epics = []
  }

  /**
   * Link the given epic with this role.
   * @param epic - the epic to link with this role
   */
  associateEpic(epic: Epic) {
    this.epics.push(epic)
  }
}
