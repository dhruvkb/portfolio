import type { Role as IRole, Org as IOrg, RoleType } from 'reschume'

import type { Epic } from '@/models/project'
import { ResumeItem } from '@/models/resume'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Role extends IRole {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Org extends IOrg {}

export class Org extends ResumeItem {
  roles: Record<string, Role>

  constructor(orgJson: IOrg) {
    super(orgJson)

    this.shortName = orgJson.shortName
    this.url = orgJson.url

    this.children = orgJson.children
    this.roles = Object.fromEntries(
      this.children.map((roleJson) => {
        const role = new Role(roleJson, this)
        return [role.id, role]
      }),
    )
  }
}

export class Role extends ResumeItem {
  org!: Org
  epicSlugs: string[]
  epics: Epic[]

  constructor(roleJson: IRole, org: Org) {
    super(roleJson)

    this.type = roleJson.type
    this.period = roleJson.period
    this.epicSlugs = Array.isArray(roleJson.epicSlugs) ? roleJson.epicSlugs : []

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
