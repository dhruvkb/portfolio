import type { RoleLocation, RoleType, Url, Skill, Address } from 'recivi/src'

const ROLE_TYPE_DISPLAYS: Record<RoleType, string> = {
  contract: 'Contract',
  foss: 'FOSS',
  'full-time': 'Full-time',
  internship: 'Internship',
  'part-time': 'Part-time',
  freelance: 'Freelance',
  temp: 'Temporary',
  volunteer: 'Volunteer',
  other: 'Other',
} as const

const ROLE_LOCATION_DISPLAY: Record<RoleLocation, string> = {
  remote: 'Remote',
  onsite: 'On-site',
  hybrid: 'Hybrid',
} as const

/**
 * Get the display name for a given role type code.
 *
 * @param roleType - the code for the type of the role
 * @returns the display name for the role type
 */
export function roleTypeDisplay(roleType: RoleType): string | undefined {
  return ROLE_TYPE_DISPLAYS[roleType]
}

/**
 * Get the display name for a given role location code.
 *
 * @param roleLocation - the code for the location of the role
 * @returns the display name for the role location
 */
export function roleLocationDisplay(
  roleLocation: RoleLocation
): string | undefined {
  return ROLE_LOCATION_DISPLAY[roleLocation]
}

/**
 * Convert a `Url` object into a string. Récivi URLs can be
 */
export function urlToDest(url: Url): string {
  return typeof url === 'object' && 'dest' in url ? url.dest : url
}

/**
 * Convert a given country code into the country's flag emoji. This is easier
 * than mapping it to a country name, considering there can be multiple
 * representations of the name.
 *
 * @param countryCode - the ISO 3166-1 Alpha-2 code for the country
 * @returns the flag emoji
 */
function countryCodeDisplay(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
}

/**
 * Convert the address into a string.
 *
 * @param address - the address to stringify
 * @returns the string representation of the address
 */
export function addressDisplay(address: Address) {
  let text = countryCodeDisplay(address.countryCode)
  if (address.state) {
    text = `${address.state}, ${text}`
  }
  if (address.city) {
    text = `${address.city}, ${text}`
  }
  return text
}

/**
 * Convert a given skill and all its sub-skills into a flat textual
 * representation.
 *
 * @param skill - the skill to convert to a string
 * @returns the string representation of the skill and all its sub-skills
 */
export function skillDisplay(skill: Skill): string {
  if (typeof skill === 'string') {
    return skill
  }
  const { name, subSkills } = skill
  let output = name
  if (subSkills?.length) {
    output = `${output} (${subSkills.map(skillDisplay).join(', ')})`
  }
  return output
}
