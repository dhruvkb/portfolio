/**
 * Calculate a hash for a string between 0 and `len`.
 *
 * @param text - the string to hash
 * @param len - the maximum value of the hash (exclusive)
 * @returns the hash as a number
 */
export function getHash(text: string, len: number): number {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0
  }
  return hash % len
}
