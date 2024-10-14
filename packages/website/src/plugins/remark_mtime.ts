import { statSync } from 'fs'
import { execSync } from 'child_process'
import type { Plugin } from 'unified'

interface Astro {
  frontmatter: {
    modDate: string
  }
}

/**
 * Get the modification timestamp of a file from Git.
 *
 * @param path - the path to the file whose modification timestamp is being read
 * @returns the modification timestamp of the file
 */
function getGitMtime(path: string): string {
  return execSync(`git log -1 --format=%cI ${path}`).toString()
}

/**
 * Get the modification timestamp of a file from the filesystem.
 *
 * @param path - the path to the file whose modification timestamp is being read
 * @returns the modification timestamp of the file
 */
function getFsMtime(path: string): string {
  return statSync(path).mtime.toISOString()
}

/**
 * a remark plugin to add the modification timestamps of the files to the
 * Markdown frontmatter
 */
export const remarkMtime: Plugin = () => {
  return (_, file) => {
    const path = file.path
    if (!path) return

    const gitTimestamp = getGitMtime(path)
    const fsTimestamp = getFsMtime(path)
    const timestamp = gitTimestamp || fsTimestamp
    const date = timestamp.substring(0, timestamp.indexOf('T'))

    // eslint-disable-next-line no-extra-semi
    ;(file.data.astro as Astro).frontmatter.modDate = date
  }
}
