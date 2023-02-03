import { useDocuments, type PageComponent } from 'iles'
import { computed } from 'vue'

export interface Post extends PageComponent {
  title: string
  date: Date
  isFeatured: boolean
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
