import { ResumeNode, ResumeNodeJson } from '@/models/resume'

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
}

export class Role extends ResumeNode implements RoleJson {
  type: string
  period: Period

  isLast: boolean

  constructor(role: RoleJson, isLast = false) {
    super(role)

    this.type = role.type
    this.period = role.period

    this.isLast = isLast
  }

  /** whether I am currently working in this role */
  isActive(): boolean {
    return this.period.end === undefined
  }

  /** the human-readable start date of the period */
  periodStart(): string {
    return this.period.start.join(' ')
  }

  /** the human-readable end date of the period */
  periodEnd(): string {
    return this.period.end?.join(' ') ?? ''
  }
}

export interface Org extends ResumeNodeJson {
  url: string
  icon: string

  roles: Record<string, Role>
}
