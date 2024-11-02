import type { Resume, Url } from 'recivi'

import type { Cert, Institute, Epic, Org, Project, Role } from '@/models/recivi'

export const recivi = (await import(
  '@/../../examples/recivi.json'
)) as unknown as Resume

const githubProfile = recivi.bio.profiles?.find(
  (profile) => profile.site.id === 'github'
)
export let githubUrl: Url | undefined = undefined
if (githubProfile) {
  if ('url' in githubProfile) {
    githubUrl = githubProfile.url
  } else {
    githubUrl = `https://github.com/${githubProfile.username}`
  }
}

export const insitutes: Institute[] =
  recivi.education?.map((rcvInstitute) => {
    const institute: Institute = {
      ...rcvInstitute,
      certs: [] as Cert[],
    }
    institute.certs =
      rcvInstitute.certs?.map((cert) => ({ ...cert, institute })) ?? []
    return institute
  }) ?? []

export const certs: Cert[] = insitutes.flatMap(
  (institute: Institute) => institute.certs
)

export const epics: Epic[] =
  recivi.creations?.map((rcvEpic) => {
    const epic: Epic = {
      ...rcvEpic,
      role: null,
      projects: [] as Project[],
    }
    epic.projects =
      rcvEpic.projects?.map((project) => ({ ...project, epic })) ?? []
    return epic
  }) ?? []

export const projects: Project[] = epics.flatMap((epic: Epic) => epic.projects)

export const orgs: Org[] =
  recivi.work?.map((rcvOrg) => {
    const org: Org = {
      ...rcvOrg,
      roles: [] as Role[],
    }
    org.roles = rcvOrg.roles?.map((role) => ({ ...role, org, epics: [] })) ?? []
    return org
  }) ?? []

export const roles: Role[] = orgs.flatMap((org: Org) => org.roles)

// Link roles and epics

roles.forEach((role) => {
  epics.forEach((epic) => {
    if (role.epicIds?.includes(epic.id)) {
      epic.role = role
      role.epics.push(epic)
    }
  })
})
