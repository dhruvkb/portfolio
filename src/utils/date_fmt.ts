import type { Date as RcvDate } from '@recivi/schema'

type Y = [number]
type YM = [number, number]
type YMD = [number, number, number]

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString('default', { month: 'short' })
)

/**
 * Convert a JS native `Date` object into a Récivi date.
 *
 * @param date - the date to convert
 * @returns the date in Récivi's `YMD` format
 */
export function getRcvDate(date: Date): YMD {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
}

/**
 * Convert the given date from a Récivi format to an array format with either
 * one, two or three elements.
 *
 * @param date - the date in a known Récivi formats
 * @returns the date as an array with either one, two or three elements
 */
function parseRcvDate(date: RcvDate): Y | YM | YMD {
  if (Array.isArray(date)) {
    return date
  }
  return [date.year, date.month, date.day]
}

/**
 * Convert the date into a stylised human-readable format. Depending on the
 * known components, the format can be one of the following:
 * - numeric year (e.g. 2022)
 * - short month name, numeric year (e.g. Jan-2022)
 * - two-digit date, short month name, numeric year (e.g. 06-Jan-2022)
 *
 * @param date - the date as per the Récivi specification
 * @param useMarkup - whether to wrap the date components in HTML markup
 */
export function dateDisplay(date: RcvDate, useMarkup = true): string {
  const [year, month, day] = parseRcvDate(date)
  const dateComponents = []
  if (year) {
    dateComponents.push(year.toString())
  }
  if (month) {
    dateComponents.push(MONTHS[month - 1])
  }
  if (day) {
    dateComponents.push(day.toString().padStart(2, '0'))
  }
  return dateComponents
    .reverse()
    .join(useMarkup ? '<span class="text-subtle">-</span>' : '-')
}

/**
 * Convert the date into a plain human-readable format. Depending on the known
 * components, the format can be one of the following:
 * - numeric year (e.g. 2022)
 * - full month name, numeric year (e.g. January 2022)
 * - full month name, numeric date, numeric year (e.g. January 6, 2022)
 *
 * @param date - the date as per the Récivi specification
 * @returns the data formatted according to the user's locale
 */
export function dateReadable(date: RcvDate): string {
  const [year, month, day] = parseRcvDate(date)
  const dateObj = new Date(year, (month ?? 1) - 1, day ?? 1)

  const opt: Intl.DateTimeFormatOptions = {}
  if (year) {
    opt.year = 'numeric'
  }
  if (month) {
    opt.month = 'long'
  }
  if (day) {
    opt.day = 'numeric'
  }

  return dateObj.toLocaleDateString(undefined, opt)
}
