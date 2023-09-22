export const ROLE_TYPE = [
  'full-time',
  'part-time',
  'contract',
  'internship',
  'freelance',
  'foss',
  'volunteer',
  'temp',
  'other',
] as const

export type RoleType = (typeof ROLE_TYPE)[number]
