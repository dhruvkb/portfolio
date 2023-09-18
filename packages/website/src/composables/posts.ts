import { useDocuments, usePage, type PageComponent, type Document } from 'iles'
import { computed } from 'vue'

export interface Post extends PageComponent {
  title: string
  date: Date
  isFeatured: boolean
  /**
   * the name of a post series; Posts with the same series name are listed as
   * related to each other.
   */
  series?: string
  /**
   * the serial index of the post; This is deduced from the first 4 digits in
   * the file name and injected automatically.
   */
  index: number
}

export const usePosts = () => {
  const allPostDocs = useDocuments<Post>('@/pages/blog/posts/')
  const sortedPostDocs = computed(() =>
    [...allPostDocs.value].sort((a, b) => b.index - a.index)
  )
  const featuredPostDocs = computed(() =>
    sortedPostDocs.value.filter((postDoc) => postDoc.isFeatured)
  )

  return {
    allPostDocs,
    sortedPostDocs,
    featuredPostDocs,
  }
}

export const useCurrPost = () => {
  const frontmatter = usePage().frontmatter as Post
  const { allPostDocs } = usePosts()

  const currIndex = computed(() => frontmatter.index)

  const adjacentPosts = computed(() => {
    const adjacent: { sNo: number | string; doc: Document<Post> }[] = []
    Object.entries({ prev: -1, next: 1 }).forEach(([sNo, offset]) => {
      const doc = allPostDocs.value.at(currIndex.value + offset)
      if (doc) adjacent.push({ sNo, doc })
    })
    return adjacent
  })

  const seriesName = computed(() => frontmatter.series)
  const seriesPosts = computed(() =>
    seriesName.value
      ? allPostDocs.value
          .filter((item) => item.series === seriesName.value)
          .map((doc, index) => ({ sNo: index + 1, doc }))
      : []
  )

  return {
    currIndex,

    adjacentPosts,

    seriesName,
    seriesPosts,
  }
}
