export const ROLE_LOCATIONS = ['remote', 'onsite', 'hybrid'] as const

export type RoleLocation = (typeof ROLE_LOCATIONS)[number]
