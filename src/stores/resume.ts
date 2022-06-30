import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import axios from 'axios'

import { Epic, Project } from '@/models/project'
import type { Resume } from '@/models/resume'
import { Org, Role } from '@/models/role'

export const useResume = defineStore('resume', () => {
  const resume = ref<Resume | null>(null)

  // Parse project data from JSON.
  const epics = computed<Record<string, Epic>>(() => Object.fromEntries(
    (resume.value?.projects ?? []).map((epicJson) => [epicJson.id, new Epic(epicJson)]),
  ))
  const projects = computed<Project[]>(() => Object.values(epics.value)
    .flatMap((epic) => Object.values(epic.projects)))

  // Parse role data from JSON.
  const orgs = computed<Record<string, Org>>(() => Object.fromEntries(
    (resume.value?.roles ?? []).map((orgJson) => [orgJson.id, new Org(orgJson)]),
  ))
  const roles = computed<Role[]>(() => Object.values(orgs.value)
    .flatMap((org) => Object.values(org.roles)))

  const initResume = async (url: string) => {
    const response = await axios.get(url)
    resume.value = response.data

    // Establish role-epic associations.
    roles.value.forEach((role) => {
      role.epicSlugs?.forEach((slug) => {
        const epic = epics.value[slug]
        role.associateEpic(epic)
        epic.associateRole(role)
      })
    })
  }

  return {
    initResume,

    resume,

    epics,
    projects,

    orgs,
    roles,
  }
})
