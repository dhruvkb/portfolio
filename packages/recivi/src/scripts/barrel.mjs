import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync } from 'fs'

import { globSync } from 'glob'
import chalk from 'chalk'

const EXPORT_RE = /export (?:interface|type) (?<name>\w+)/

const projectRoot = new URL('../..', import.meta.url)
const modelsUrl = new URL('src/models/', projectRoot)
const modelsPath = fileURLToPath(modelsUrl)
const allTsFiles = globSync(`${modelsPath}**/*.ts`)

console.log(`${chalk.blue('BRL')} Collect start`)

const fileExports = allTsFiles.flatMap((tsFile) => {
  const code = readFileSync(tsFile, { encoding: 'utf-8' })
  const importPath = `@${tsFile.split(/recivi\/src/)[1].replace(/\.ts$/, '')}`
  const lines = code.split('\n')
  return lines
    .map((line) => EXPORT_RE.exec(line))
    .filter(Boolean)
    .map((match) => `export type { ${match.groups.name} } from '${importPath}'`)
})

const barrelUrl = new URL('src/index.ts', projectRoot)
writeFileSync(barrelUrl, fileExports.join('\n'), { encoding: 'utf-8' })

console.log(
  `${chalk.green('BRL')} ${chalk.bold('src/index.ts')} ${chalk.green(
    `${fileExports.length} models`
  )}`
)
console.log(`${chalk.green('BRL')} ⚡️ Collection success`)
