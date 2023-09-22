/**
 * a telephone number that can be used to reach the entity
 * @example
 *   {
 *     "countryCode": 91,
 *     "number": "9876543210"
 *   }
 */
export interface Phone {
  /**
   * the country calling code for the phone number, without any leading '+' or
   * zeroes; In implementations, the country code may be used as the key to look
   * up the country name.
   * @asType integer
   */
  countryCode: number
  /**
   * the phone number itself, in the preferred format; This can include hyphens
   * and parentheses.
   */
  number: string
}
