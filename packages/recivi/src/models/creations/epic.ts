import type { Project } from '@/models/creations/project'
import type { Url } from '@/models/base/url'

interface ExtendedEpic {
  /**
   * the public facing URL to access this epic homepage; This should be a place
   * where more information about the epic can be found.
   */
  url: Url
  /**
   * a short description or introduction of the epic
   */
  summary: string
  /**
   * a list of projects that are part of this epic
   */
  projects: Project[]
}

/**
 * a large creative endeavour that the user has undertaken; The user can work on
 * one or more projects as a part of an epic.
 */
export interface Epic extends Partial<ExtendedEpic> {
  /**
   * an identifier for the epic; In implementations, this can be used as a key
   * to find the logo for the epic.
   */
  id: string
  /**
   * the name of the epic
   */
  name: string
}
