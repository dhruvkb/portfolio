interface ExtendedTech {
  /**
   * a short informal name for the technology; This can be an abbreviation.
   */
  shortName: string
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
