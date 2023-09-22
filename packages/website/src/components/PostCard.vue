<!--
Renders a link to a post with other information like the date of publication and
an excerpt from the content.
-->

<script setup lang="ts">
  import type { Document } from 'iles'

  import Link from '@/components/Link.vue'
  import { useIcon } from '@/composables/icon'
  import type { Post } from '@/composables/posts'
  import { audibleDate, readableDate } from '@/utils/date'

  interface Props {
    doc: Document<Post>
    isLink?: boolean
    showIndex?: boolean
    showFeatured?: boolean
  }
  withDefaults(defineProps<Props>(), {
    isLink: true,
    showIndex: true,
    showFeatured: true,
  })

  const { getIcon } = useIcon()
</script>

<template>
  <component
    :is="isLink ? Link : 'div'"
    class="block p-1"
    :url="{
      dest: doc.href,
      label: `Read post '${doc.title}'`,
    }"
    :is-italicised="false"
    :is-lowercase="false"
    :is-underlined="false"
    :is-emphasised="false"
    :arrow="null">
    <div class="flex flex-row items-center group-hover:text-imp">
      <!-- Post index or featured star icon -->
      <slot name="start">
        <div v-if="showIndex">
          {{ doc.index }}<span class="text-low">.</span>
        </div>
        <div
          v-if="showFeatured && doc.isFeatured"
          class="w-[2ch]">
          <component
            :is="getIcon('star')"
            aria-hidden="true" />
        </div>
      </slot>

      <span
        class="ml-ch font-semibold group-hover:text-imp"
        :class="{ underline: isLink }">
        {{ doc.title }}
      </span>

      <slot name="end">
        <!-- This is automatically invisible when the root element is not `<Link>`. -->
        <span
          class="inline-block translate-x-0 font-sans font-semibold text-red-500 opacity-0 transition-[opacity,transform] duration-100 group-hover:translate-x-1 group-hover:opacity-100"
          aria-hidden="true"
          >→</span
        >
      </slot>

      <div class="ml-auto flex flex-row items-center">
        <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
        <span
          :title="audibleDate(doc.date)"
          v-html="readableDate(doc.date)" />
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </div>

    <slot name="excerpt">
      <component
        :is="doc"
        class="not-printing:my-0"
        excerpt />
    </slot>
  </component>
</template>
