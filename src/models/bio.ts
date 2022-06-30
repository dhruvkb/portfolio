export interface Contact {
  emails: string[]
  phones: string[]
}

/**
 * Represents one of the many social media and communication platforms that can
 * be used to find, follow and contact me.
 */
export interface Profile {
  id: string
  name: string
  username?: string
  url?: string
}

export interface Bio {
  contact: Contact
  social: Profile[]
}
