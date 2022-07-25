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
  const idEpicMap = ref<Record<string, Epic>>({})
  const epics = computed<Epic[]>(() => {
    const creations = resume.value?.creations ?? []
    return creations.map((epicJson) => {
      const epic = new Epic(epicJson)
      idEpicMap.value[epicJson.id] = epic
      return epic
    })
  })

  // Parse role data from JSON.
  const orgs = computed<Org[]>(() => {
    const work = resume.value?.work ?? []
    return work.map((orgJson) => new Org(orgJson))
  })

  const initResume = (data: Resume) => {
    resume.value = data

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
