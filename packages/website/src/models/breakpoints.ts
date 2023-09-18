// Keep in sync with Tailwind config.
export const breakpoints = ['sm', 'md', 'lg'] as const

export type Breakpoint = (typeof breakpoints)[number]
