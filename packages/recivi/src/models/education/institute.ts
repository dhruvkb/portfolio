import type { Address } from '@/models/base/address'
import type { Contact } from '@/models/base/contact'
import type { Url } from '@/models/base/url'
import type { Cert } from '@/models/education/cert'

interface ExtendedInstitute {
  /**
   * a short informal name for the institute; This can be an abbreviation.
   */
  shortName: string
  /**
   * the public facing URL to access the institute website; This should be a
   * place where more information about the institute can be found.
   */
  url: Url
  /**
   * the physical location of the institute; This can be a campus or the
   * location where the institute is registered to receive communications.
   */
  address: Address
  /**
   * the contact information to reach the institute
   */
  contact: Contact
  /**
   * a list of certifications earned at the institute
   */
  certs: Cert[]
}

/**
 * an organisation that imparts education or training, and offers certifications
 * to corroborate the same; The user can acquire one or more certifications from
 * an institute.
 * @example
 *   {
 *     "id": "mit",
 *     "name": "Massachusetts Institute of Technology",
 *     "shortName": "MIT",
 *     "url": "https://web.mit.edu/",
 *     "address": {
 *        "city": "Cambridge",
 *        "state": "Massachusetts",
 *        "countryCode": "US",
 *        "postalCode": "02139"
 *     },
 *   }
 */
export interface Institute extends Partial<ExtendedInstitute> {
  /**
   * an identifier for the institute; In implementations, this can be used as
   * a key to find the logo for the institute.
   */
  id: string
  /**
   * the name of the institute
   */
  name: string
}
