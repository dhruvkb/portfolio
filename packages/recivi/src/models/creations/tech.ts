import type { Url } from '@/models/base/url'

interface ExtendedTech {
  /**
   * a short informal name for the technology; This can be an abbreviation.
   */
  shortName: string
  /**
   * the URL to the website or documentation for the technology
   */
  url: Url
}

/**
 * a programming language, tool or framework used in the creation of a project
 * @example
 *   {
 *     "id": "react",
 *     "name": "React",
 *   }
 * @example
 *   {
 *     "id": "typescript",
 *     "name": "TypeScript",
 *     "shortName": "TS"
 *   }
 * @example
 *   {
 *     "id": "recivi",
 *     "name": "Récivi",
 *     "url": {
 *       "dest": "https://recivi.vercel.app",
 *       "label": "Récivi homepage"
 *     }
 *   }
 */
export interface Tech extends Partial<ExtendedTech> {
  /**
   * an identifier for the technology; In implementations, this can be used to
   * find the icon for the language or framework.
   */
  id: string
  /**
   * the name of the technology
   */
  name: string
}
