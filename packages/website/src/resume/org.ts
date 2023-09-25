import type { Org as RcvOrg } from 'recivi'

import { Role } from '@/resume/role'
import type { Featured } from '@/resume/featured'

export interface Org extends Omit<RcvOrg, 'roles'> {}

export class Org {
  /**
   * a list of roles that are part of this org
   */
  roles: Role[]

  constructor(orgJson: RcvOrg, featured: Featured) {
    Object.assign(this, orgJson)
    this.roles =
      orgJson.roles?.map((role) => new Role(this, role, featured)) ?? []
  }

  /**
   * whether this org has at least one featured role
   */
  get someFeatured(): boolean {
    return this.roles.some((role) => role.isFeatured)
  }
}
