import fs from 'node:fs'
import path from 'node:path'

import { ImageResponse } from '@vercel/og'
import { html } from 'satori-html'

import { site } from '@/stores/site'
import { getBody } from '@/utils/icon'

const fonts = (
  [
    { family: 'JetBrainsMono', variant: 'Regular', weight: 400 },
    { family: 'Inter', variant: 'Regular', weight: 400 },
    { family: 'Inter', variant: 'Bold', weight: 700 },
  ] as const
).map(({ family, variant, weight }) => ({
  name: family,
  weight,
  style: 'normal' as const,
  data: fs.readFileSync(
    path.resolve(`./src/assets/fonts/${family}-${variant}.ttf`)
  ),
}))

/**
 * Convert the given text, which may contain HTML markup into plain-text
 * that can be rendered into the OG image.
 *
 * @param html - the HTML markup to convert
 * @returns the plain-text representation
 */
function markupToText(html: string): string {
  return html.replace(/<\/?code>/g, '`').replace(/<[^>]*>/g, '')
}

/**
 * Create an image response with the given content.
 *
 * @param content - the content to render into the image
 * @returns the image response
 */
export function getOgImage(content: {
  title: string
  description: string
  left?: string
  right?: string
  icon?: string | undefined
}): ImageResponse {
  const left = content.left ?? ''
  const right = content.right ?? ''
  const icon = content.icon ?? ''

  const markup = `
    <div
      class="flex h-full w-full flex-col justify-between p-16"
      style="background-image: linear-gradient(to bottom, #1e1e2e, #181825); background-size: 1200px 600px; color: #cdd6f4; font-family: Inter;">
      <!-- Header -->
      <div
        class="mb-10 flex justify-between text-4xl"
        style="color: #7f849c;">
        <div class="flex items-center">
          <div class="font-bold">${site.title}</div>
          ${left && '/'}${left}
        </div>
        ${right}
      </div>
      <!-- Main -->
      <div class="flex flex-grow flex-col">
        <!-- Title -->
        <div
          class="mb-6 flex items-center text-8xl font-bold"
          style="color: #fab387;">
          ${
            icon &&
            `
                <svg
                  viewBox="0 0 24 24"
                  class="mr-4 h-20 w-20"
                  fill="currentColor">
                  ${getBody(icon)}
                </svg>
              `
          }
          ${content.title}
        </div>
        <!-- Description -->
        <div class="text-4xl leading-normal">
          ${markupToText(content.description)}
        </div>
      </div>
    </div>
  `
  const element = html(markup)

  const config = {
    width: 1200,
    height: 600,
    fonts,
  }
  return new ImageResponse(element, config)
}
