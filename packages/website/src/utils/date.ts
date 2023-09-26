import type { Date as RcvDate, Y, YM, YMD } from 'recivi'

/**
 * Split the date into three components, namely the year, the month and the
 * date. Automatically adjusts the month to be 1-indexed.
 *
 * @param date - the JS date to split into components
 * @return an array with three elements, namely the year, the month and the date
 */
const splitDate = (date: Date): [number, number, number] => [
  date.getFullYear(),
  date.getMonth() + 1, // Months are indexed from 0.
  date.getDate(),
]

/**
 * Convert a date into a tuple. If the date is already a tuple, it will be
 * returned as-is.
 *
 * @param date - the Récivi date to convert into a tuple
 * @return an array with 1-3 elements, namely the year, the month and the date
 */
const tuplifyDate = (date: RcvDate): Y | YM | YMD => {
  if (Array.isArray(date)) {
    return date
  }
  return [date.year, date.month, date.day]
}

/**
 * Convert the date into a human-audible format. Depending on the known
 * components, the date will contain the numeric date, full month name and the
 * numeric year.
 *
 * @param date - the date components to format
 * @return the date formatted to be heard
 */
export const audibleDate = (date: RcvDate | Date) => {
  const components = date instanceof Date ? splitDate(date) : tuplifyDate(date)

  const [yyyy, mm = 1, dd = 1] = components

  const options: Intl.DateTimeFormatOptions = {}
  if (components.length >= 1) options.year = 'numeric'
  if (components.length >= 2) options.month = 'long'
  if (components.length >= 3) options.day = 'numeric'

  return new Date(yyyy, mm - 1, dd).toLocaleString('default', options)
}

/**
 * Convert the date into a human-readable format. Depending on the known
 * components, the format can be one of the following:
 * - `%Y` (e.g. 2023)
 * - `%b.%y` (e.g. Jan.23)
 * - `%d.%b.%Y` (e.g. 01.Jan.2023)
 *
 * @see https://www.strfti.me/
 * @param date - the date components to format
 * @return the date formatted to be read
 */
export const readableDate = (date: RcvDate | Date) => {
  const components = date instanceof Date ? splitDate(date) : tuplifyDate(date)

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i + 1, 0).toLocaleDateString('en', { month: 'short' })
  )

  const [yyyy, mm = undefined, dd = undefined] = components
  const dateText: (string | number)[] = [dd || !mm ? yyyy : yyyy % 100]
  if (mm) dateText.push(monthNames[mm - 1])
  if (dd) dateText.push(dd.toString().padStart(2, '0'))

  return dateText.reverse().join('<span class="text-low">.</span>')
}
