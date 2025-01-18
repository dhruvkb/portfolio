/**
 * Enable Tailwind's Prettier plugin by returning the same string unchanged.
 */
export const tw = (strings: readonly string[], ...values: unknown[]) =>
  String.raw({ raw: strings }, ...values)
