import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { Resume } from 'recivi'

import { Epic } from '@/resume/epic'
import { Org } from '@/resume/org'
import type { Featured } from '@/resume/featured'

import resumeJson from '@/data/recivi.json'
import featuredJson from '@/data/featured.json'

export const useResume = defineStore('resume', () => {
  const resume = ref<Resume>(resumeJson as Resume)

  // Parse bio data from JSON
  const bio = computed(() => resume.value?.bio)
  const creations = ref<Epic[]>([])
  const work = ref<Org[]>([])
  const education = computed(() => resume.value?.education)

  const featured = ref<Featured>(featuredJson as Featured)

  const loadResume = () => {
    creations.value =
      resume.value.creations?.map((epic) => new Epic(epic, featured.value)) ??
      []
    work.value =
      resume.value.work?.map((org) => new Org(org, featured.value)) ?? []

    work.value.forEach((org) => {
      org.roles.forEach((role) => {
        role.epicIds?.forEach((epicId) => {
          const epic = creations.value.find((item) => item.id === epicId)
          if (epic) {
            role.associateEpic(epic)
            epic.associateRole(role)
          }
        })
      })
    })
  }

  return {
    loadResume,

    resume,

    bio,
    epics: creations,
    orgs: work,
    education,

    featured,
  }
})
