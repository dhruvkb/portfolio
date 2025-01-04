/**
 * Apply Tailwind utilities to the HTML generated from Markdown/MDX content.
 *
 * This is useful for applying styles solely to generated HTML and not to Astro
 * components.
 */

import type { VFile } from 'vfile'
import type { Element, Node, Root } from 'hast'
import type { MdxJsxTextElement, MdxJsxFlowElement } from 'mdast-util-mdx'
import type { RehypePlugin } from '@astrojs/markdown-remark'

import { visit } from 'unist-util-visit'

// We have to use relative imports because this file is used in Astro config.
import { tw } from '../utils/tailwind'

const TAG_UTIL_MAP = {
  common: {
    blockquote: tw`border-l-2 border-l-peach pl-2`,
    code: tw`px-1 py-0.5 not-italic [:not(pre)>&]:border [:not(pre)>&]:bg-surface0`,
    hr: tw`my-4 flex h-fit items-center justify-center border-none text-subtle after:content-["*\\a0\\a0*\\a0\\a0*"]`,
    kbd: tw`rounded border border-b-2 border-b-peach bg-surface0 px-1 pb-0.5 pt-1`,
    li: tw`marker:text-peach gfm-done:marker:text-green gfm-done:marker:content-["✓_"] gfm-todo:marker:content-["▢_"] [&.task-list-item_input]:appearance-none [&[id^="user-content-fn"]_p]:my-0`,
    ol: tw`ml-4 list-decimal [:not(li)>&]:my-4 [li>&]:list-lower-roman`,
    pre: tw`my-4 border p-2`,
    table: tw`my-4 border`,
    ul: tw`ml-4 list-disc marker:mr-2 [:not(li)>&]:my-4`,
  } as Record<string, string>,
  page: {
    h2: tw`hdiv my-4 text-peach`,
  } as Record<string, string>,
  post: {
    h2: tw`mb-4 text-2xl font-bold`,
    h3: tw`mb-4 text-xl font-bold`,
    h4: tw`mb-4 text-lg font-bold`,
    h5: tw`mb-4 text-base font-bold`,
    h6: tw`mb-4 text-sm font-bold`,
  } as Record<string, string>,
}

type SourceType = 'page' | 'post'

function isElement(elem: Node): elem is Element {
  return elem.type === 'element'
}

function isMdxJsxTextElement(
  elem: Node
): elem is MdxJsxTextElement | MdxJsxFlowElement {
  return elem.type === 'mdxJsxTextElement' || elem.type === 'mdxJsxFlowElement'
}

function getVisitor(type: SourceType) {
  return function visitor(elem: Node) {
    if (isElement(elem)) {
      styleElem(type, elem)
    } else if (isMdxJsxTextElement(elem)) {
      styleMdxJsxElem(type, elem)
    }
  }
}

function styleMdxJsxElem(
  type: SourceType,
  elem: MdxJsxTextElement | MdxJsxFlowElement
) {
  if (!elem.name) {
    return
  }

  const existingClasses = elem.attributes.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'class'
  )?.value
  const value = [
    existingClasses,
    TAG_UTIL_MAP[type]?.[elem.name],
    TAG_UTIL_MAP.common[elem.name],
  ]
    .flat()
    .filter(Boolean)
    .join(' ')
  if (value) {
    elem.attributes.push({ type: 'mdxJsxAttribute', name: 'class', value })
  }
}

function styleElem(type: SourceType, elem: Element) {
  if (elem.properties.id === 'footnote-label') {
    // Despite being part of a post's content, the footnote section heading is
    // styled like a page heading.
    elem.properties.className = TAG_UTIL_MAP.page.h2
    return
  }

  const existingClasses = elem.properties.className
  const className = [
    existingClasses,
    TAG_UTIL_MAP[type]?.[elem.tagName],
    TAG_UTIL_MAP.common[elem.tagName],
  ]
    .flat()
    .filter(Boolean)
    .join(' ')
  if (className) {
    elem.properties.className = className
  }
}

/**
 * a rehype plugin to add Tailwind classes to HTML elements to enable styling
 * without running into specificity issues
 */
export const rehypeTailwind: RehypePlugin = () => {
  return (tree: Root, file: VFile) => {
    const type: SourceType = file.path.includes('/posts') ? 'post' : 'page'

    visit(tree, getVisitor(type))
  }
}
