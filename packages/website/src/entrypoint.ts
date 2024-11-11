import type { Alpine } from 'alpinejs'

export interface WritingsStore {
  activeCategories: string[]
  isActiveCategoryOverlap(categories: string[]): boolean
}

export default (Alpine: Alpine) => {
  Alpine.store('writings', {
    activeCategories: [],

    isActiveCategoryOverlap(categories: string[]): boolean {
      if (!this.activeCategories.length) {
        // If no category is active, show all posts.
        return true
      }

      return categories.some((category) =>
        this.activeCategories.includes(category)
      )
    },
  } satisfies WritingsStore)
}
