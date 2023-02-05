/**
 * Compare two 2D arrays to see if there are completely identical. This assumes
 * that the arrays are rectangular, i.e. the length of the nested array is same.
 *
 * It is fast returning for `false` in the following cases:
 * - exactly one of the arrays is `undefined`
 * - the arrays have different numbers of rows or columns
 *
 * It is fast returning for `true` in the following cases:
 * - both arrays are `undefined`
 * - both arrays have zero rows or columns
 *
 * In all other cases, it will iteratively compare every cell of the two arrays.
 *
 * @param a - the first array
 * @param b - the second array
 * @return `true` if the arrays are completely identical, `false` otherwise
 */
export const areEqual = <T>(
  a: T[][] | undefined,
  b: T[][] | undefined
): boolean => {
  if (a === undefined || b === undefined) return a === b

  const aCols = a.length
  const bCols = b.length
  if (aCols !== bCols) return false
  if (aCols === 0 && bCols === 0) return true

  const aRows = a[0].length
  const bRows = b[0].length
  if (aRows !== bRows) return false
  if (aRows === 0 && bRows === 0) return true

  for (let i = 0; i < aCols; i += 1) {
    for (let j = 0; j < aRows; j += 1) {
      if (a[i][j] !== b[i][j]) return false
    }
  }

  return true
}
