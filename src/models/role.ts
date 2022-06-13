import { Epic } from '@/models/project'
import { ResumeNode, ResumeNodeJson } from '@/models/resume'
import { Overwrite } from '@/types/utils'

export interface Period {
  /**
   * the start date of the role, represented as a string pair with the month and
   * the year
   */
  start: string[]
  /**
   * the end date of the role, represented as a string pair with the month and
   * the year; can be undefined if the role is still active
   */
  end?: string[]
}

export interface RoleJson extends ResumeNodeJson {
  type: string
  period: Period
  epics?: string[]
}

export class Role extends ResumeNode implements Overwrite<RoleJson, {
  epics: Epic[]
}> {
  type: string
  period: Period
  epics: Epic[]

  isLast: boolean

  constructor(role: RoleJson, epics: Epic[], isLast = false) {
    super(role)

    this.type = role.type
    this.period = role.period

    this.epics = epics
    this.isLast = isLast
  }
}

export interface Org extends ResumeNodeJson {
  url: string
  icon: string

  roles: Record<string, Role>
}
