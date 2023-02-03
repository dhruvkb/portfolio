/**
 * Format the date according to ISO 8601. This function does not preserve the
 * time and time zone information from the format, only 'YYYY-MM-DD'.
 *
 * @param date - the date to format according to ISO 8601
 * @return the formatted date string
 */
export const formatDate = (date: Date): string => {
  const text = date.toISOString()
  return text.substring(0, text.indexOf('T'))
}
