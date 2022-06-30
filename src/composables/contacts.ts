import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import type { Profile } from '@/models/bio'
import { useResume } from '@/stores/resume'

export const useContacts = () => {
  const resumeStore = useResume()
  const { resume } = storeToRefs(resumeStore)

  const contactMedia = computed(() => {
    const social = resume.value?.bio.social ?? []
    const emails: Profile[] = resume.value?.bio.contact.emails.map((email) => ({
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
