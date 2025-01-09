import puppeteer from 'puppeteer'

import chalk from 'chalk'

const projectRoot = new URL('../..', import.meta.url)
const pdfUrl = new URL('dist/resume.pdf', projectRoot)

/**
 * Returns the current time in %H:%M:%S format, which is the format used
 * by Astro in the output of the build subcommand.
 *
 * @returns {string} the current time formatted as %H:%M:%S
 */
function timestamp() {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false })
  return chalk.dim(timestamp)
}

/**
 * Runs Puppeteer, visits the PDF page in the preview site and "prints"
 * the page to a PDF file inside the `dist/` directory.
 */
async function printToPdf() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:4322/resume/pdf', {
    waitUntil: 'networkidle0',
  })
  await page.pdf({
    path: pdfUrl,
    format: 'A4',
    margin: { top: 0, right: 0, bottom: 0, left: 0 }, // Page already has margins.
    printBackground: true, // Divider lines use background colors.
  })
  await browser.close()
}

console.log(chalk.green.inverse(' building résumé PDF '))
console.log(`${timestamp()} ${chalk.blue('[print]')} Building PDF...`)
await printToPdf()
console.log(`${timestamp()} ${chalk.blue('[print]')} ${chalk.green('✓ built')}`)
