interface FormalUrl {
  /**
   * the URL itself
   * @format uri
   */
  dest: string
  /**
   * a label for the URL; This makes the URL accessible and provides more info
   * about the destination.
   */
  label: string
}

/**
 * a combination of the URL itself and a label for a11y purposes; If a label is
 * not to be provided, use a plain string.
 * @example
 *   {
 *     "dest": "https://dhruvkb.dev",
 *     "label": "My website"
 *   }
 * @example
 *   "https://dhruvkb.dev"
 */
export type Url = FormalUrl | string
