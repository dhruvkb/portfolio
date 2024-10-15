interface Site {
  /** the final URL where the site is deployed, no trailing slash */
  baseUrl: string
  title: string
  birthYear: number
  prodAge: number
}

export const site = (await import('@/data/site.json')) as Site
