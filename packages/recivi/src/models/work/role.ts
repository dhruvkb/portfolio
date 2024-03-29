import type { Period } from '@/models/base/period'
import type { RoleLocation } from '@/models/work/role_location'
import type { RoleType } from '@/models/work/role_type'

interface ExtendedRole {
  /**
   * a short description or introduction of the role
   */
  summary: string
  /**
   * a list of highlights, like responsibilities or achievements, from the role
   */
  highlights: string[]
  /**
   * the nature of the role, in terms of length, commitment and obligations
   */
  type: RoleType
  /**
   * the nature of the role, in terms of place of work
   */
  location: RoleLocation
  /**
   * the time duration for which the role was held
   */
  period: Period
  /**
   * the list of IDs for epics that were created or worked on during this role;
   * This is a relationship to the `Epic` model.
   */
  epicIds: string[]
}

export interface Role extends Partial<ExtendedRole> {
  /**
   * an identifier for the role
   */
  id: string
  /**
   * the job title of the role
   */
  name: string
}
