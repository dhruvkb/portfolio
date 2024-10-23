import type { Transformer } from 'unified'
import type { Parent } from 'unist'
import type { Element } from 'hast'

const TAG_UTIL_MAP = {
  common: {
    ul: 'my-4 list-disc marker:mr-2 ml-4',
    li: 'marker:text-red gfm-done:marker:text-green gfm-done:marker:content-["✓_"] gfm-todo:marker:content-["▢_"] [&.task-list-item_input]:appearance-none [&[id^="user-content-fn"]_p]:my-0',
    ol: 'my-4 list-decimal ml-4',
  } as Record<string, string>,
  page: {
    h2: 'hdiv my-4 text-red',
  } as Record<string, string>,
  post: {
    h2: 'mb-4 text-2xl',
    h3: 'mb-4 text-xl',
    h4: 'mb-4 text-lg',
    h5: 'mb-4 text-base',
    h6: 'mb-4 text-sm',
  } as Record<string, string>,
}

function traverse(node: Parent, type: 'page' | 'post') {
  node.children.forEach((child) => {
    if (child.type !== 'element') {
      return
    }

    const elem = child as Element

    if (elem.properties.id === 'footnote-label') {
      // Footnotes are part of the post's MDX content, but they are styled like
      // headings on pages.
      elem.properties.className = TAG_UTIL_MAP.page.h2
      return
    }

    const classes = [
      TAG_UTIL_MAP[type]?.[elem.tagName],
      TAG_UTIL_MAP['common']?.[elem.tagName],
    ].filter((item): item is string => item !== undefined)
    if (classes.length) {
      const currClasses = Array.isArray(elem.properties.className)
        ? elem.properties.className.join(' ')
        : elem.properties.className
      if (currClasses && typeof currClasses === 'string') {
        classes.push(currClasses)
      }
      elem.properties.className = classes.join(' ')
    }

    traverse(elem, type)
  })
}

/**
 * a rehype plugin to add Tailwind classes to HTML elements to enable styling
 * without running into specificity issues
 */
export function rehypeTailwind(): Transformer {
  return (tree, file) => {
    const type = file.path.includes('content/posts') ? 'post' : 'page'
    if ('children' in tree) {
      traverse(tree as Parent, type)
    } else {
      console.log('No children')
    }
  }
}
