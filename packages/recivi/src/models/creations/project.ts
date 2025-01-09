import type { Tech } from '@/models/creations/tech'
import type { Period } from '@/models/base/period'
import type { Url } from '@/models/base/url'
import type { Tag } from '@/models/base/tag'

interface ExtendedProject {
  /**
   * the public facing URL to access this project
   */
  url: Url
  /**
   * a short description or introduction of the project
   */
  summary: string
  /**
   * long-form description of the project; This is used where space is
   * not constrained.
   */
  description: string
  /**
   * a list of highlights, like noteworthy or salient features, from the project
   */
  highlights: string[]
  /**
   * the role of the user in this project
   * @example
   *   "developer"
   * @example
   *   "author"
   */
  role: string
  /**
   * a list of technologies used in this project
   */
  technologies: Tech[]
  /**
   * the period over which the project was built or maintained
   */
  period: Period
  /**
   * tags to apply to this project; The use of tags is left up to the
   * application (for example, the portfolio uses tags for PDF résumés).
   */
  tags: Tag[]
}

/**
 * a creative endeavour undertaken as a part of a larger epic
 */
export interface Project extends Partial<ExtendedProject> {
  /**
   * an identifier for the project
   */
  id: string
  /**
   * the name of the project
   */
  name: string
}
