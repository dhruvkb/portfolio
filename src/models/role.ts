import { Epic } from '@/models/project'
import { ResumeItem, ResumeItemJson } from '@/models/resume'

export interface Period {
  start: string[]
  end?: string[]
}

/* JSON models */

export interface RoleJson extends ResumeItemJson {
  type: string
  period: Period

  /* references to epic by slug */
  epicSlugs?: string[]
}

export interface OrgJson extends ResumeItemJson {
  shortName?: string
  url: string

  children: RoleJson[]
}

/* JS models: Use interface/class merging to avoid declaring variables again. */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Role extends RoleJson {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Org extends OrgJson {}

export class Org extends ResumeItem {
  roles: Record<string, Role>

  constructor(orgJson: OrgJson) {
    super(orgJson)

    this.shortName = orgJson.shortName
    this.url = orgJson.url

    this.children = orgJson.children
    this.roles = Object.fromEntries(
      this.children.map((roleJson) => {
        const role = new Role(roleJson, this)
        return [role.slug, role]
      }),
    )
  }
}

export class Role extends ResumeItem {
  isFirst: boolean
  isLast: boolean
  org!: Org
  epics: Epic[]

  constructor(roleJson: RoleJson, org: Org) {
    super(roleJson)

    this.type = roleJson.type
    this.period = roleJson.period
    this.epicSlugs = roleJson.epicSlugs

    this.org = org

    const siblings = org.children
    this.isFirst = siblings.indexOf(roleJson) === 0
    this.isLast = siblings.indexOf(roleJson) === siblings.length - 1

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
