import type { Skill } from '@/models/bio/skill'
import type { Profile } from '@/models/bio/profile'
import type { Contact } from '@/models/base/contact'

interface ExtendedBio {
  /**
   * the full name of the person; The person may not want to disclose this for
   * privacy reasons.
   */
  fullName: string
  /**
   * a list of other names that the person goes by; This can be a nickname, a
   * pseudonym, or the name in a different language.
   */
  aliases: string[]
  /**
   * the URL to a profile picture for the person; For example, this can be a
   * Gravatar link, or the URL to an image hosted on a public URL.
   * @format uri
   */
  image: string
  /**
   * a few short labels describing the person
   */
  labels: string[]
  /**
   * a fairly brief summary of the person
   */
  summary: string
  /**
   * a fairly long introduction about the person
   */
  introduction: string
  /**
   * a detailed description of the person
   */
  description: string
  /**
   * the contact information to reach the person
   */
  contact: Contact
  /**
   * a list of web profiles for the person
   */
  profiles: Profile[]
  /**
   * a list of skills that the person has
   */
  skills: Skill[]
}

/**
 * information related to the identity of a person
 */
export interface Bio extends Partial<ExtendedBio> {
  /**
   * the nickname or preferred name of the person; This should be the name used
   * for most intents and purposes.
   */
  name: string
}
