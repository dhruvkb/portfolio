export const ARROWS = {
  NORTHEAST: {
    glyph: '↗',
    classes: ['group-hover:translate-x-1', 'group-hover:-translate-y-1'],
  },
  EAST: {
    glyph: '→',
    classes: ['group-hover:translate-x-1'],
  },
  SOUTH: {
    glyph: '↓',
    classes: ['group-hover:translate-y-1'],
  },
  WEST: {
    glyph: '←',
    classes: ['group-hover:-translate-x-1'],
  },
} as const
export type Arrow = keyof typeof ARROWS
