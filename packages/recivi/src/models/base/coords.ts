/**
 * a pair of two numbers that uniquely identify a point on the globe
 */
export interface Coords {
  /**
   * a measure of distance North (positive) or South (negative) of the Equator
   * (zero degrees)
   * @minimum -90
   * @maximum 90
   * @asType integer
   */
  lat: number
  /**
   * a measure of distance East (positive) or West (negative) of the Prime
   * Meridian (zero degrees)
   * @minimum -180
   * @maximum 180
   * @asType integer
   */
  long: number
}
