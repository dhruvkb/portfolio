import { readFileSync } from 'node:fs'

import type { Resume } from '@recivi/schema'

import type { Cert, Institute, Epic, Org, Project, Role } from '@/models/recivi'
import { site } from '@/stores/site'

async function loadRecivi() {
  if (site.reciviUrl.startsWith('file://')) {
    const text = readFileSync(site.reciviUrl.replace('file://', ''), 'utf-8')
    return JSON.parse(text) as Resume
  }

  const res = await fetch(site.reciviUrl)
  return (await res.json()) as Resume
}

export const recivi: Resume = await loadRecivi()

export const institutes: Institute[] =
  recivi.education?.map((rcvInstitute) => {
    const institute: Institute = {
      ...rcvInstitute,
      certs: [] as Cert[],
    }
    institute.certs =
      rcvInstitute.certs?.map((cert) => ({ ...cert, institute })) ?? []
    return institute
  }) ?? []

export const certs: Cert[] = institutes.flatMap(
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
    if (epic.id && role.epicIds?.includes(epic.id)) {
      epic.role = role
      role.epics.push(epic)
    }
  })
})
