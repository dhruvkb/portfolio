/**
 * Represents one of the many social media and communication platforms that can
 * be used to find, follow and contact me.
 */
export interface ContactMedium {
  name: string
  icon: string

  text: string
  url?: string

  isLast?: boolean
}
