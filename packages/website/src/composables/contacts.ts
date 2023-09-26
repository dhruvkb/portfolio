import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import type { Profile } from 'recivi'

import { useResume } from '@/stores/resume'

export const useContacts = () => {
  const resumeStore = useResume()
  const { bio } = storeToRefs(resumeStore)

  const contactMedia = computed(() => {
    const social = bio.value.profiles ?? []
    const emails: Profile[] =
      bio.value.contact?.emails.map((email) => ({
        site: { id: 'email', name: 'Email' },
        username: email,
      })) ?? []

    return [...social, ...emails]
  })

  return {
    contactMedia,
  }
}
