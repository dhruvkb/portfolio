interface Site {
  /** the final URL where the site is deployed, no trailing slash */
  baseUrl: string
  /** the URL to the repository containing the source code for this site */
  repoUrl: string
  /** the creator ID that is used for author attribution in the Fediverse */
  fediverse?: string
  title: string
  birthYear: number
  /** age at which I started writing software as a hobby */
  hobbyAge: number
  /** age at which I started working as a software developer */
  jobAge: number
}

export const site = (await import('@/data/site.json')) as Site
