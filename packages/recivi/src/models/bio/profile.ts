import type { Site } from '@/models/bio/site'
import type { Url } from '@/models/base/url'

interface UsernameIdentity {
  /**
   * the username or handle of the person on the website
   */
  username: string
}

interface UrlIdentity {
  /**
   * the URL to the profile of the person on the website
   */
  url: Url
}

type CompleteIdentity = UsernameIdentity & UrlIdentity
type Identity = UsernameIdentity | UrlIdentity | CompleteIdentity

/**
 * an account on a web platform
 * @example
 *   {
 *     "site": {
 *       "id": "github",
 *       "name": "GitHub",
 *     },
 *     "username": "dhruvkb",
 *     "url": "https://github.com/dhruvkb"
 *   }
 * @example
 *   {
 *     "site": {
 *       "id": "bluesky",
 *       "name": "Bluesky",
 *     },
 *     "username": "dhruvkb.bsky.social",
 *   }
 * @example
 *   {
 *     "site": {
 *       "id": "linkedin",
 *       "name": "LinkedIn",
 *     },
 *     "url": "https://www.linkedin.com/in/dhruvkb"
 *   }
 */
export type Profile = {
  /**
   * the website on which the profile is located; This can be a professional
   * website or social network.
   */
  site: Site
} & Identity
