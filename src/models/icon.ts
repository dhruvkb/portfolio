export interface Path {
  d: string
  'fill-rule': 'nonzero' | 'evenodd'
  color?: string
}

export interface Icon {
  paths: Path[]
}
