interface ExtendedSite {
  /**
   * the base URL for the site; This is not the profile URL but the main URL of
   * the site itself.
   */
  url: string
}

/**
 * a web platform on which a person can have a profile
 * @example
 *   {
 *     "id": "github",
 *     "name": "GitHub",
 *   }
 * @example
 *   {
 *     "id": "linkedin",
 *     "name": "LinkedIn",
 *     "url": "https://www.linkedin.com"
 *   }
 */
export interface Site extends Partial<ExtendedSite> {
  /**
   * a slug for the site; In implementations, this can be used as a key to find
   * the icon for the site.
   */
  id: string
  /**
   * the readable name of the site, as it should be displayed to users; This
   * should follow the site's preferred punctuation and capitalization.
   */
  name: string
}
