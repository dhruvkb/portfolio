import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import type { Profile } from 'reschume'

import { useResume } from '@/stores/resume'

export const useContacts = () => {
  const resumeStore = useResume()
  const { bio } = storeToRefs(resumeStore)

  const contactMedia = computed(() => {
    const social = bio.value?.social ?? []
    const emails: Profile[] =
      bio.value?.contact?.emails.map((email) => ({
        id: 'email',
        name: 'Email',
        username: email,
      })) ?? []

    return [...social, ...emails]
  })

  return {
    contactMedia,
  }
}
