// Keep in sync with Tailwind config
export const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'] as const

export type Breakpoint = typeof breakpoints[number]
