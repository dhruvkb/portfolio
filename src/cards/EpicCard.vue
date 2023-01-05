<script setup lang="ts">
  import { computed } from 'vue'

  import type { Epic } from '@/models/project'

  import Brand from '@/components/Brand.vue'
  import Link from '@/components/Link.vue'
  import TechStack from '@/components/TechStack.vue'

  interface Props {
    epic: Epic
    showFeaturedOnly?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showFeaturedOnly: false,
  })

  const projects = computed(() =>
    props.showFeaturedOnly
      ? props.epic.featuredProjects
      : Object.values(props.epic.projects)
  )
</script>

<template>
  <div class="px-page flex flex-col gap-1 printing:px-0">
    <div class="flex flex-row items-center justify-between">
      <Brand
        :id="epic.id"
        class="text-lg font-medium text-neutral-900 printing:leading-snug dark:text-neutral-200"
        :name="epic.name" />
      <Brand
        v-if="epic.role?.org"
        :id="epic.role.org.id"
        class="text-neutral-400 dark:text-neutral-600"
        :name="epic.role.org.name" />
    </div>

    <!-- Epic description -->
    <p
      v-if="epic.summary"
      class="hidden printing:block">
      {{ epic.summary }}
    </p>

    <!-- Projects -->
    <!-- Padding to align with the roles in `OrgCard`. -->
    <ul class="pl-[1.875em] printing:pl-0">
      <li
        v-for="(project, projectIndex) in projects"
        :key="projectIndex"
        class="flex flex-col gap-1 printing:my-2 printing:first-of-type:mt-0 printing:last-of-type:mb-0">
        <div
          class="flex flex-row items-center gap-4 printing:flex-wrap printing:gap-0">
          <span class="text-lg printing:font-medium printing:leading-normal">{{
            project.name
          }}</span>
          <TechStack
            class="ml-auto text-neutral-400 dark:text-neutral-600"
            :technologies="project.technologies ?? []" />
          <Link
            v-if="project.url"
            class="text-neutral-400 printing:w-full dark:text-neutral-600"
            :dest="project.url"
            :label="project.urlLabel" />
        </div>

        <!-- Project description -->
        <p
          v-if="project.summary"
          class="hidden printing:block">
          {{ project.summary }}
        </p>

        <!-- Highlights -->
        <ul class="hidden list-disc pl-4 printing:block">
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
