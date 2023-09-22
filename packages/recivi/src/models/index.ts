import type { Bio } from '@/models/bio/bio'
import type { Org } from '@/models/work/org'
import type { Epic } from '@/models/creations/epic'
import type { Institute } from '@/models/education/institute'

/**
 * @example
 *   {
 *     "bio": {
 *       "name": "John Doe",
 *     }
 *   }
 */
export interface Resume {
  bio: Bio
  education?: Institute[]
  creations?: Epic[]
  work?: Org[]
}
