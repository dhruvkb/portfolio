import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import axios from 'axios'
import type { Resume } from 'reschume'

import { Epic } from '@/models/project'
import { Org } from '@/models/role'

export const useResume = defineStore('resume', () => {
  const resume = ref<Resume | null>(null)

  // Parse bio data from JSON
  const bio = computed(() => resume.value?.bio)

  // Parse creations data from JSON.
  const epics = ref<Epic[]>([])
  const populateEpics = () => {
    const creations = resume.value?.creations ?? []
    creations.forEach((epicJson) => {
      const epic = new Epic(epicJson)
      epics.value.push(epic)
    })
  }

  // Parse role data from JSON.
  const orgs = ref<Org[]>([])
  const populateOrgs = () => {
    const work = resume.value?.work ?? []
    work.forEach((orgJson) => {
      const org = new Org(orgJson)
      orgs.value.push(org)
    })
  }

  const mapRelations = () => {
    // Establish role-epic associations.
    orgs.value.forEach((org) => {
      org.roles.forEach((role) => {
        role.epicIds?.forEach((epicId) => {
          const epic = epics.value.find((item) => item.id === epicId)
          if (epic) {
            role.associateEpic(epic)
            epic.associateRole(role)
          }
        })
      })
    })
  }

  const initResume = (data: Resume) => {
    resume.value = data
    populateEpics()
    populateOrgs()
    mapRelations()
  }

  const loadResume = async (url: string) => {
    const response = await axios.get(url)
    initResume(response.data)
  }

  return {
    initResume,
    loadResume,

    resume,

    bio,
    epics,
    orgs,
  }
})
