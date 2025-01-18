import type {
  Epic as RcvEpic,
  Org as RcvOrg,
  Project as RcvProject,
  Role as RcvRole,
  Institute as RcvInstitute,
  Cert as RcvCert,
} from '@recivi/schema'

export interface Cert extends RcvCert {
  institute: Institute
}

export interface Institute extends Omit<RcvInstitute, 'certs'> {
  certs: Cert[]
}

export interface Role extends RcvRole {
  org: Org
  epics: Epic[]
}

export interface Org extends Omit<RcvOrg, 'roles'> {
  roles: Role[]
}

export interface Project extends RcvProject {
  epic: Epic
}

export interface Epic extends Omit<RcvEpic, 'projects'> {
  role: Role | null
  projects: Project[]
}
