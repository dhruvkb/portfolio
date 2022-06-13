import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

import { Epic, Project, ProjectJson } from '@/models/project'
import { Org, Role, RoleJson } from '@/models/role'

import projectsJson from '@/data/projects.json'
import experienceJson from '@/data/roles.json'

/**
 * a modified version of `Org` that contains `children` as an array of
 * `RoleJson` instances instead of the slug-`Role` mapping
 */
interface OrgJson extends Omit<Org, 'roles'> {
  children: RoleJson[]
}

/**
 * a modified version of `Epic` that contains `children` as an array of
 * `Project` instances instead of a mapping
 */
interface EpicJson extends Omit<Epic, 'projects'> {
  children: ProjectJson[]
}

export const useResumeStore = defineStore('resume', () => {
  const epics: Ref<Record<string, Epic>> = ref({})

  const projectsData: EpicJson[] = projectsJson
  projectsData.forEach((entry) => {
    const projects: Record<string, Project> = {}
    const { length } = entry.children
    entry.children.forEach((child, index) => {
      projects[child.slug] = new Project(child, index === length - 1)
    })
    epics.value[entry.slug] = { ...entry, projects }
  })

  const experience: Ref<Record<string, Org>> = ref({})

  const experienceData: OrgJson[] = experienceJson
  experienceData.forEach((entry) => {
    const roles: Record<string, Role> = {}
    const { length } = entry.children
    entry.children.forEach((child, index) => {
      const roleEpics = (child.epics ?? []).map((epicName) => epics.value[epicName])
      roles[child.slug] = new Role(child, roleEpics, index === length - 1)
    })
    experience.value[entry.slug] = { ...entry, roles }
  })

  return { epics, experience }
})
