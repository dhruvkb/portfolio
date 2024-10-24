import type { Alpine } from 'alpinejs'

export interface WritingsStore {
  activeCategory: string | undefined
  setActiveCategory(category: string): void
}

export default (Alpine: Alpine) => {
  Alpine.store('writings', {
    activeCategory: undefined,

    /**
     * Set the given category as the active category. If the category is already
     * active, clear it.
     */
    setActiveCategory(category: string) {
      if (this.activeCategory === category) {
        this.activeCategory = undefined
      } else {
        this.activeCategory = category
      }
    },
  } satisfies WritingsStore)
}
