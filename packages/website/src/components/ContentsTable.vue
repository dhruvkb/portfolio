<!--
Renders a table of contents enabling the reader to quickly jump to a different
part of the page.
-->

<script setup lang="ts">
  import { usePage } from 'iles'
  import { computed } from 'vue'

  import type { Heading } from '@islands/headings'

  interface NestedHeading extends Heading {
    parent?: NestedHeading
    children: NestedHeading[]
  }

  const SHAPES = {
    BEND: '└─',
    TEE: '├─',
    PIPE: `│\xa0`,
    SPACE: '\xa0'.repeat(2),
  } as const
  type Shape = keyof typeof SHAPES

  interface Props {
    headings?: NestedHeading[] | undefined
    preShapes?: Shape[]
  }
  const props = withDefaults(defineProps<Props>(), {
    headings: undefined,
    preShapes: () => [],
  })

  /**
   * Convert the given flat list of headings of various levels into a tree of
   * headings. Return a list of top-level headings, with their subheadings
   * contained in a `children` field.
   *
   * @param headings - the flattened list of headings
   * @return the list of top-level headings with nested children
   */
  const nestHeadings = (headings: Heading[]): NestedHeading[] => {
    const nestedHeadings: NestedHeading[] = []
    let lastHeading: NestedHeading | undefined

    headings.forEach((heading) => {
      const currHeading: NestedHeading = { ...heading, children: [] }
      while (lastHeading && lastHeading.level >= currHeading.level) {
        lastHeading = lastHeading.parent
      }
      if (lastHeading) {
        lastHeading.children.push(currHeading)
        currHeading.parent = lastHeading
      } else {
        nestedHeadings.push(currHeading)
      }
      lastHeading = currHeading
    })

    return nestedHeadings
  }

  const { meta } = usePage()
  const headings = computed(
    () => props.headings ?? nestHeadings(meta.headings ?? [])
  )
  const isTopLevel = computed(() => props.headings === undefined)

  /**
   * Create the tree lines using Unicode box-drawing characters, based on the
   * list of their readable names. Append a non-breaking space after every set
   * so that there is a space between the graph and the text.
   *
   * @param shapes - the list of names of box-drawing characters
   * @return the actual tree shape
   */
  const boxChars = (shapes: Shape[]): string =>
    shapes.map((shape) => `${SHAPES[shape]}\xa0`).join('')

  const isLast = (index: number) => index === headings.value.length - 1
  const currShape = (index: number): Shape[] => [
    ...props.preShapes,
    isLast(index) ? 'BEND' : 'TEE',
  ]
  const nextPreShape = (index: number): Shape[] => [
    ...props.preShapes,
    isLast(index) ? 'SPACE' : 'PIPE',
  ]
</script>

<template>
  <ol
    v-if="headings"
    :aria-label="isTopLevel ? 'Table of contents' : undefined">
    <li
      v-for="(heading, headingIndex) in headings"
      :key="heading.slug">
      <span
        aria-hidden="true"
        class="text-low">
        {{ boxChars(currShape(headingIndex)) }}
      </span>
      <Link
        :arrow="null"
        :url="{
          dest: { hash: `#${heading.slug}` },
          label: `Read section '${heading.title}'`,
        }"
        :is-lowercase="false">
        {{ heading.title }}
      </Link>
      <ContentsTable
        :headings="heading.children"
        :pre-shapes="nextPreShape(headingIndex)" />
    </li>
  </ol>
</template>
