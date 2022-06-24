import { Epic, type EpicJson, Project } from '@/models/project'
import { Org, type OrgJson, Role } from '@/models/role'

import projectsJson from '@/data/projects.json'
import rolesJson from '@/data/roles.json'

export const useResume = () => {
  // Parse project data from JSON.
  const epicData: EpicJson[] = projectsJson
  const epics: Record<string, Epic> = Object.fromEntries(
    epicData.map((epicJson) => [epicJson.slug, new Epic(epicJson)]),
  )
  const projects: Project[] = Object.values(epics)
    .flatMap((epic) => Object.values(epic.projects))

  // Parse role data from JSON.
  const orgData: OrgJson[] = rolesJson
  const orgs: Record<string, Org> = Object.fromEntries(
    orgData.map((orgJson) => [orgJson.slug, new Org(orgJson)]),
  )
  const roles: Role[] = Object.values(orgs)
    .flatMap((org) => Object.values(org.roles))

  // Establish role-epic associations.
  roles.forEach((role) => {
    role.epicSlugs?.forEach((slug) => {
      const epic = epics[slug]
      role.associateEpic(epic)
      epic.associateRole(role)
    })
  })

  return {
    epics,
    projects,

    orgs,
    roles,
  }
}
