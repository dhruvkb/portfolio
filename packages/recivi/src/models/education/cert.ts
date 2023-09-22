import type { Date } from '@/models/base/date'
import type { Period } from '@/models/base/period'

interface ExtendedCert {
  /**
   * a short informal name for the certificate. This can be an abbreviation.
   */
  shortName: string
  /**
   * the score achieved in the certificate examination; This is the overall
   * score (cumulative) for the complete certificate.
   * @example
   *   "86"
   * @example
   *   "3.9"
   * @example
   *   "B-"
   */
  score: string
  /**
   * the maximum attainable score in the certificate examination
   * @example
   *   "100"
   * @example
   *   "4.0"
   * @example
   *   "A+"
   */
  maxScore: string
  /**
   * a list of courses completed to obtain the certificate
   * @example
   *   "CS50 - Introduction to Computer Science"
   */
  courses: string[]
  /**
   * the date on which the certificate is set to become invalid; This is to be
   * left blank if the certificate does not expire.
   */
  expiration: Date
}

/**
 * a document that proves successful completion of a course of education or
 * training
 * @example
 *   {
 *     "id": "b_tech",
 *     "name": "Bachelor of Technology",
 *     "shortName": "B. Tech.",
 *     "field": "Engineering Physics",
 *     "period": {
 *       "start": [2015],
 *       "end": [2019]
 *     },
 *     "score": "7.286",
 *     "maxScore": "10.000",
 *     "courses": [
 *       "PH101 - Introduction to Physics",
 *     ]
 *   }
 */
export interface Cert extends Partial<ExtendedCert> {
  /**
   * an identifier for the certificate
   */
  id: string
  /**
   * the name of the certificate
   */
  name: string
  /**
   * the field of study in which the certificate was obtained
   */
  field: string
  /**
   * the period of study for the certificate
   */
  period: Period
}
