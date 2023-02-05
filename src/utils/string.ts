/**
 * Convert the list into a human-readable string representation.
 *
 * @param items - the list of items to represent as a string
 * @param lastSep - the separator used before the last item in the list
 * @param sep - the separator used between all items except the last
 * @return the human-readable representation of the list
 */
export const stringifyList = (items: string[], lastSep = ', ', sep = ', ') =>
  items.length === 1
    ? items[0]
    : `${items.slice(0, items.length - 1).join(sep)}${lastSep}${items.at(-1)}`
