import { Epic } from '@/models/project'
import { ResumeItem, ResumeItemJson } from '@/models/resume'
import { Overwrite } from '@/types/utils'

export interface Period {
  start: string[]
  end?: string[]
}

/* JSON models */

export interface RoleJson extends ResumeItemJson {
  type: string
  period: Period

  /* references to epic by slug */
  epics?: string[]
}

export interface OrgJson extends ResumeItemJson {
  shortName?: string
  url: string

  children: RoleJson[]
}

/* JS models */

// Use interface/class merging to avoid declaring variables again.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Role extends Overwrite<RoleJson, { epics: Epic[] }> {}

export interface Org extends OrgJson {
  roles: Record<string, Role>
}

export class Role extends ResumeItem {
  isLast: boolean
  org!: Org

  constructor(roleJson: RoleJson, orgJson: OrgJson) {
    super(roleJson)

    this.type = roleJson.type
    this.period = roleJson.period
    this.epics = []

    const siblings = orgJson.children
    this.isLast = siblings.indexOf(roleJson) === siblings.length - 1
  }

  /**
   * Set the given `Org` instance as the parent of this role.
   * @param org - the parent organisation to link to the role
   */
  setOrg(org: Org) {
    this.org = org
  }

  /**
   * Associate the given `Epic` instance with this role.
   * @param epic - the epic to relate with this role
   */
  associateEpic(epic: Epic) {
    this.epics.push(epic)
  }
}
