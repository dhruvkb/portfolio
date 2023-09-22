interface ExtendedAddress {
  /**
   * the city in which the address is located
   */
  city: string
  /**
   * the state or province in which the address is located
   */
  state: string
  /**
   * the PIN/ZIP code, at which the location can receive mail; This can also be
   * a postbox that is disconnected from the geographical location.
   * @asType integer
   */
  postalCode: number
}

/**
 * a physical geographical location; This field can optionally include mailing
 * information.
 */
export interface Address extends Partial<ExtendedAddress> {
  /**
   * the ISO 3166-1 Alpha-2 code for the country in which the address is located
   * @minLength 2
   * @maxLength 2
   */
  countryCode: string
}
