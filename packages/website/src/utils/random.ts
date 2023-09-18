/**
 * Return a random element from an array.
 *
 * @param list - the array from which to choose an element randomly
 * @return the randomly chosen element
 */
export const sample = <T>(list: T[]): T => {
  const { length } = list
  return list[Math.floor(length * Math.random())]
}
