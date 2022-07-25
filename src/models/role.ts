import type { Role as IRole, Org as IOrg, RoleType } from 'reschume'

import type { Epic } from '@/models/project'
import { ResumeItem } from '@/models/resume'

import type { Overwrite } from '@/utils/types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Role extends IRole {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Org extends Overwrite<IOrg, {roles: Role[]}> {}

export class Org extends ResumeItem {
  constructor(orgJson: IOrg) {
    super(orgJson)

    this.shortName = orgJson.shortName
    this.url = orgJson.url

    this.summary = orgJson.summary

    this.roles = orgJson.roles.map((roleJson) => new Role(roleJson, this))
  }

  get featuredRoles(): Role[] {
    return Object.values(this.roles).filter((role) => role.isFeatured)
  }
}

export class Role extends ResumeItem {
  org!: Org
  epicIds: string[]
  epics: Epic[]

  constructor(roleJson: IRole, org: Org) {
    super(roleJson)

    this.type = roleJson.type
    this.period = roleJson.period
    this.epicIds = Array.isArray(roleJson.epicIds) ? roleJson.epicIds : []

    this.isFeatured = typeof roleJson.isFeatured === 'boolean' ? roleJson.isFeatured : false
    this.summary = roleJson.summary
    this.highlights = roleJson.highlights

    this.org = org

    this.epics = [] // populated in `associateEpic`
  }

  /**
   * Associate the given `Epic` instance with this role.
   * @param epic - the epic to relate with this role
   */
  associateEpic(epic: Epic) {
    this.epics.push(epic)
  }
}

export const roleTypes: Record<RoleType, string> = {
  'foss-contributor': 'FOSS',
  'part-timer': 'Part-timer',
  'full-timer': 'Full-timer',
  intern: 'Intern',
  contractor: 'Contractor',
}
