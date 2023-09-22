/**
 * @asType integer
 */
type Year = number

/**
 * @asType integer
 * @minimum 1
 * @maximum 12
 */
type Month = number

/**
 * @asType integer
 * @minimum 1
 * @maximum 31
 */
type Day = number

interface FormalDate {
  day: Day
  month: Month
  year: Year
}

type Y = [Year]
type YM = [Year, Month]
type YMD = [Year, Month, Day]

/**
 * a combination of year, month and day; This date can optionally skip the day
 * and month fields, as needed.
 * @example
 *   [2020]
 * @example
 *   [2020, 12]
 * @example
 *   [2020, 12, 31]
 * @example
 *   {
 *     "year": 2020,
 *     "month": 12,
 *     "day": 31
 *   }
 */
export type Date = Y | YM | YMD | FormalDate
