import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

import { Epic, EpicJson, Project } from '@/models/project'
import { Org, OrgJson, Role } from '@/models/role'

import projectsJson from '@/data/projects.json'
import rolesJson from '@/data/roles.json'

export const useResumeStore = defineStore('resume', () => {
  const epics: Ref<Record<string, Epic>> = ref({})
  const projects: Ref<Project[]> = ref([])

  const projectsData: EpicJson[] = projectsJson
  projectsData.forEach((epicJson) => {
    const projectMap: Record<string, Project> = {}
    const projectList: Project[] = []

    epicJson.children.forEach((projectJson) => {
      const project = new Project(projectJson, epicJson)
      projectMap[projectJson.slug] = project
      projectList.push(project)
      projects.value.push(project)
    })

    const epic = {
      ...epicJson,
      projects: projectMap,
    }
    projectList.forEach((project) => project.setEpic(epic))
    epics.value[epicJson.slug] = epic
  })

  const orgs: Ref<Record<string, Org>> = ref({})
  const roles: Ref<Role[]> = ref([])

  const rolesData: OrgJson[] = rolesJson
  rolesData.forEach((orgJson) => {
    const roleMap: Record<string, Role> = {}
    const roleList: Role[] = []

    orgJson.children.forEach((roleJson) => {
      const role = new Role(roleJson, orgJson)
      roleMap[roleJson.slug] = role
      roleList.push(role)
      roles.value.push(role)

      roleJson.epics?.forEach((epicName: string) => {
        role.associateEpic(epics.value[epicName])
      })
    })

    const org = {
      ...orgJson,
      roles: roleMap,
    }
    roleList.forEach((role) => role.setOrg(org))
    orgs.value[orgJson.slug] = org
  })

  return {
    epics,
    projects,

    orgs,
    roles,
  }
})
