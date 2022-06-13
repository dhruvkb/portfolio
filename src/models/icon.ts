/**
 * Represents an SVG `path` tag.
 */
export interface Path {
  d: string

  // This affects fill and stroke if they are set to `'currentColor'`.
  color?: string

  // `fill` defaults to `'currentColor'`. For unfilled paths, set to `'none'`.
  fill?: string
  'fill-rule'?: 'nonzero' | 'evenodd'

  stroke?: string
  'stroke-width'?: number
}

/**
 * Represents an icon which, in its simplest form, is but a collection of paths.
 */
export interface Icon {
  paths: Path[]
}
