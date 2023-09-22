import type { Date } from '@/models/base/date'

/**
 * a duration of time between a start and end date; For active periods, the end
 * date can be omitted.
 */
export interface Period {
  /**
   * the start date of the period
   */
  start: Date
  /**
   * the end date of a period; If omitted, the period is considered active in
   * the present.
   */
  end?: Date
}
