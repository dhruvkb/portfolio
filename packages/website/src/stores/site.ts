interface Site {
  /** the final URL where the site is deployed, no trailing slash */
  baseUrl: string
  title: string
  birthYear: number
  /** age at which I started writing software as a hobby */
  hobbyAge: number
  /** age at which I started working as a software developer */
  jobAge: number
}

export const site = (await import('@/data/site.json')) as Site
