import fs from 'fs'
import path from 'path'

import { ImageResponse } from '@vercel/og'
import { site } from '@/stores/site'
import { getHash } from '@/utils/hash'
import { COLORS } from '@/constants/colors'
import { getPaths, getBody } from '@/utils/icon'

export const COLOR_TEXT_ACCENT = '#fab387'

export type Element =
  | string
  | {
      type: string
      props: {
        tw?: string
        children: Element | Element[]
      }
    }

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
  ).buffer,
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
 * Get one of the theme's accent colors to style the heading content.
 * A hash of the text is used to determine the color so that it is both
 * pseudo-random and deterministic.
 *
 * @param text - the text to hash
 * @returns - the accent color
 */
function getAccentColor(text: string): string {
  const accentColors = Object.entries(COLORS).map(([, v]) => v[1])
  return accentColors[getHash(text, accentColors.length)] ?? '#f5e0dc' // rosewater
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
  left?: Element
  right?: Element
  icon?: string
}): ImageResponse {
  const element = {
    type: 'div',
    props: {
      tw: 'w-full h-full flex',
      style: {
        backgroundImage: 'linear-gradient(to bottom, #1e1e2e, #181825)',
        color: '#cdd6f4',
        backgroundSize: '1200px 600px',
        fontFamily: 'Inter',
      },
      children: {
        type: 'div',
        props: {
          tw: 'h-full w-full flex flex-col justify-between p-16',
          children: [
            {
              type: 'div',
              props: {
                tw: 'mb-10 flex justify-between text-4xl',
                style: { color: '#7f849c' },
                children: [
                  {
                    type: 'div',
                    props: {
                      tw: 'flex items-center',
                      children: [
                        {
                          type: 'div',
                          props: {
                            tw: 'font-bold',
                            children: site.title,
                          },
                        },
                        content.left && '/',
                        content.left,
                      ],
                    },
                  },
                  content.right,
                ],
              },
            },
            {
              type: 'div',
              props: {
                tw: 'flex-grow flex flex-col',
                children: [
                  {
                    type: 'div',
                    props: {
                      tw: 'mb-6 flex font-bold text-8xl',
                      style: {
                        color: getAccentColor(content.title),
                      },
                      children: [
                        content.icon && {
                          type: 'svg',
                          props: {
                            viewBox: '0 0 24 24',
                            tw: 'h-20 w-20 mr-4',
                            fill: 'currentColor',
                            children: getPaths(getBody(content.icon) ?? ''),
                          },
                        },
                        content.title,
                      ],
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      tw: 'text-4xl leading-normal',
                      children: markupToText(content.description),
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  }
  const config = {
    width: 1200,
    height: 600,
    fonts,
  }
  return new ImageResponse(element, config)
}
