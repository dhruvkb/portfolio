import type { MarkdownHeading } from 'astro'

export interface Heading extends MarkdownHeading {
  children: Heading[]
}

/**
 * Convert the flat list of headings into a nested tree structure. This
 * function returns the root node of the tree.
 *
 * @param headings - the flat list of headings parsed by Astro
 * @returns the root node of the tree
 */
export function buildTree(headings: MarkdownHeading[]): Heading {
  const root: Heading = {
    text: 'Contents',
    slug: '',
    depth: 0,
    children: [],
  }

  const currentPath: Heading[] = []
  headings.forEach((heading) => {
    const node: Heading = { ...heading, children: [] }

    // Pop nodes from current path until we find a parent of lower depth.
    while ((currentPath[currentPath.length - 1]?.depth ?? 0) >= node.depth) {
      currentPath.pop()
    }

    // Add to root if no parent, otherwise add to parent's children.
    if (currentPath.length === 0) {
      root.children.push(node)
    } else {
      const parent = currentPath[currentPath.length - 1]
      if (parent) {
        parent.children.push(node)
      }
    }

    currentPath.push(node)
  })

  return root
}
