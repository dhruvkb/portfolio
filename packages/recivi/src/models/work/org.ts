import type { Address } from '@/models/base/address'
import type { Contact } from '@/models/base/contact'
import type { Role } from '@/models/work/role'
import type { Url } from '@/models/base/url'

interface ExtendedOrg {
  /**
   * a short informal name for the organisation; This can be an abbreviation
   * like 'CC' instead of 'Creative Commons', for example.
   */
  shortName: string
  /**
   * a short description or introduction of the organisation
   */
  summary: string
  /**
   * the public facing URL to access the organisation website; This should be a
   * place where more information about the organisation can be found.
   */
  url: Url
  /**
   * the physical location of the organisation; This can be a workplace or the
   * location where the organisation is registered to receive communications.
   */
  address: Address
  /**
   * the contact information to reach the organisation
   */
  contact: Contact
  /**
   * a list of roles that are part of this organisation
   */
  roles: Role[]
}

/**
 * a company or institution that the user has worked for; The user can serve for
 * one or more roles at an organisation.
 */
export interface Org extends Partial<ExtendedOrg> {
  /**
   * an identifier for the organisation; In implementations, this can be used as
   * a key to find the logo for the organisation.
   */
  id: string
  /**
   * the name of the organisation
   */
  name: string
}
