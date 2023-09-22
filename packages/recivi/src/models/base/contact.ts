import type { Phone } from '@/models/base/phone'

/**
 * a collection of ways to contact a given entity
 */
export interface Contact {
  /**
   * a list of email addresses
   * @items {"type": "string", "format": "email"}
   */
  emails: string[]
  /**
   * a list of phone numbers
   */
  phones: Phone[]
}
