<!--
Renders a link to a post with other information like the date of publication and
an excerpt from the content.
-->

<script setup lang="ts">
  import type { Document } from 'iles'

  import { useIcon } from '@/composables/icon'
  import type { Post } from '@/composables/posts'

  import { formatDate } from '@/utils/date'

  interface Props {
    doc: Document<Post>
    showIndex?: boolean
  }
  withDefaults(defineProps<Props>(), {
    showIndex: true,
  })

  const { getIcon } = useIcon()
</script>

<template>
  <Link
    class="block"
    :dest="doc.href"
    :label="`Read post '${doc.title}'`"
    :is-italicised="false"
    :is-lowercase="false"
    :is-underlined="false"
    :is-emphasised="false"
    :arrow="null">
    <div class="flex flex-row items-center group-hover:text-imp">
      <!-- Post index or featured star icon -->
      <div v-if="showIndex">{{ doc.index }}<span class="text-low">.</span></div>
      <div
        v-else-if="doc.isFeatured"
        class="w-[2ch]">
        <component
          :is="getIcon('star')"
          aria-hidden="true" />
      </div>

      <span class="ml-ch font-semibold underline group-hover:text-imp">
        {{ doc.title }}
      </span>
      <span
        class="inline-block translate-x-0 font-sans font-semibold text-red-500 opacity-0 transition-[opacity,transform] duration-100 group-hover:translate-x-1 group-hover:opacity-100"
        >→</span
      >

      <div class="ml-auto flex flex-row items-center">
        <span class="text-low">{{ formatDate(doc.date) }}</span>
      </div>
    </div>

    <component
      :is="doc"
      class="not-printing:my-0"
      excerpt />
  </Link>
</template>
