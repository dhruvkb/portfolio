import { icons as siIcons } from '@iconify-json/simple-icons'
import { icons as lIcons } from '@iconify-json/lucide'

import _2fac from '@/assets/icons/2fac.svg?raw'
import browserstack from '@/assets/icons/browserstack.svg?raw'
import finrep from '@/assets/icons/finrep.svg?raw'
import img from '@/assets/icons/img.svg?raw'
import mathesar from '@/assets/icons/mathesar.svg?raw'
import pls from '@/assets/icons/pls.svg?raw'
import portfolio from '@/assets/icons/portfolio.svg?raw'
import recivi from '@/assets/icons/recivi.svg?raw'
import skyscraper from '@/assets/icons/skyscraper.svg?raw'
import starlight from '@/assets/icons/starlight.svg?raw'
import yojak from '@/assets/icons/yojak.svg?raw'

const knownIcons = {
  '2fac': _2fac,
  browserstack,
  finrep,
  img,
  mathesar,
  pls,
  portfolio,
  recivi,
  skyscraper,
  starlight,
  yojak,
} as Record<string, string>

// These are generally epics that don't have their own icon and just use the
// the icon of the parent org.
const aliases = {
  vocabulary: 'creativecommons',
  omniport: 'img',
  platform: 'browserstack',
} as Record<string, string>

export type Source = 'simple_icons' | 'lucide'

/**
 * Get the SVG body of an icon by its name and source. The source is
 * ignored if that name is in the known icons list.
 *
 * @param name - the name of the icon
 * @param source - the source of the icon
 * @returns the SVG body of the icon
 */
export function getBody(name: string, source: Source = 'simple_icons') {
  const identifier = aliases[name] ?? name

  const icon = knownIcons[identifier]
  if (icon) {
    // Strip the SVG opening and closing tags, including all attributes.
    return icon.replace(/<\/?svg[^>]*>/g, '')
  }

  if (source === 'simple_icons') {
    return siIcons.icons[identifier]?.body
  } else if (source === 'lucide') {
    return lIcons.icons[identifier]?.body
  }

  return undefined
}
