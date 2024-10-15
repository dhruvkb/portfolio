import fs from 'fs'
import path from 'path'

import { ImageResponse } from '@vercel/og'
import { site } from '@/stores/site'
import { getHash } from '@/utils/hash'
import { COLORS } from '@/constants/colors'

export const COLOR_TEXT_ACCENT = '#fab387'

const fonts = (
  [
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

export interface Element {
  type: 'div'
  props: {
    tw?: string
    style?: { [key: string]: string | number }
    children: string | Element | Element[]
  }
}

export interface Slots {
  main: Element
  right?: Element
}

/**
 * Get one of the theme's accent colors to style the heading content.
 * A hash of the text is used to determine the color so that it is both
 * pseudo-random and deterministic.
 *
 * @param text - the text to hash
 * @returns - the accent color
 */
export function getAccentColor(text: string): string {
  const accentColors = Object.entries(COLORS).map(([_, v]) => v[1])
  return accentColors[getHash(text, accentColors.length)] ?? '#f5e0dc' // rosewater
}

/**
 * Create an image response with the site's title and custom slots.
 * The slots are used to customize the content of the image.
 *
 * @param slots - the slots to customize the image
 * @returns the image response
 */
export function getImage(slots: Slots): ImageResponse {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        tw: 'w-full h-full flex',
        style: {
          backgroundImage: 'linear-gradient(to bottom, #1e1e2e, #181825)',
          color: '#cdd6f4',
          backgroundSize: '1200px 686px',
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
                  tw: 'mb-10 flex flex-row justify-between',
                  style: { color: '#7f849c' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        tw: 'font-bold text-3xl',
                        children: site.title,
                      },
                    },
                    slots.right ?? { type: 'div', props: {} },
                  ],
                },
              },
              slots.main,
            ],
          },
        },
      },
    },
    {
      width: 1200,
      height: 600,
      fonts,
    }
  )
}
