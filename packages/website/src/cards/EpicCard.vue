<script setup lang="ts">
  import { computed } from 'vue'

  import Brand from '@/components/Brand.vue'
  import Link from '@/components/Link.vue'
  import TechStack from '@/components/TechStack.vue'
  import type { Epic } from '@/resume/epic'

  interface Props {
    epic: Epic
    showFeaturedOnly?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showFeaturedOnly: false,
  })

  const projects = computed(() => props.epic.projects)
</script>

<template>
  <div :class="{ 'printing:hidden': showFeaturedOnly && !epic.someFeatured }">
    <div class="flex flex-row items-center justify-between printing:mb-1">
      <Brand
        :id="epic.id"
        class="font-medium text-imp"
        :name="epic.name" />
      <Brand
        v-if="epic.role?.org"
        :id="epic.role.org.id"
        class="text-low"
        :name="epic.role.org.name" />
    </div>

    <!-- Epic description -->
    <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
    <p
      v-if="epic.summary"
      class="mb-2 not-printing:hidden"
      v-html="epic.summary" />
    <!-- eslint-enable vue/no-v-html -->

    <!-- Projects -->
    <!-- Padding to align with the roles in `OrgCard`. -->
    <ul class="pl-[3ch] printing:pl-0">
      <li
        v-for="(project, projectIndex) in projects"
        :key="projectIndex"
        class="mt-1 flex flex-col gap-1 printing:mt-2"
        :class="{ 'printing:hidden': showFeaturedOnly && !project.isFeatured }">
        <div
          class="flex flex-row items-center gap-indent printing:flex-wrap printing:gap-0">
          <span class="printing:font-medium">{{ project.name }}</span>
          <TechStack
            class="ml-auto text-low printing:hidden"
            :technologies="project.technologies ?? []" />
          <TechStack
            class="ml-auto text-low not-printing:hidden"
            :is-short="true"
            :technologies="project.technologies ?? []" />
          <Link
            v-if="project.url"
            class="text-low printing:w-full"
            :url="project.url" />
        </div>

        <!-- Project description -->
        <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
        <p
          v-if="project.summary"
          class="not-printing:hidden"
          v-html="project.summary" />
        <!-- eslint-enable vue/no-v-html -->

        <!-- Highlights -->
        <ul
          class="flex list-disc flex-col pl-indent printing:gap-0.5 not-printing:hidden">
          <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
          <li
            v-for="(highlight, highlightIndex) in project.highlights"
            :key="highlightIndex"
            v-html="highlight" />
          <!-- eslint-enable vue/no-v-html -->
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss">
  code {
    @apply rounded bg-hl px-1 py-0.5;
  }
</style>
