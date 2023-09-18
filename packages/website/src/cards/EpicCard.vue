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
  <div>
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
    <p
      v-if="epic.summary"
      class="mb-2 not-printing:hidden">
      {{ epic.summary }}
    </p>

    <!-- Projects -->
    <!-- Padding to align with the roles in `OrgCard`. -->
    <ul class="pl-[3ch] printing:pl-0">
      <li
        v-for="(project, projectIndex) in projects"
        :key="projectIndex"
        class="mt-1 flex flex-col gap-1 printing:mt-2">
        <div
          class="flex flex-row items-center gap-indent printing:flex-wrap printing:gap-0">
          <span class="printing:font-medium">{{ project.name }}</span>
          <TechStack
            class="ml-auto text-low"
            :technologies="project.technologies ?? []" />
          <Link
            v-if="project.url"
            class="text-low printing:w-full"
            :dest="project.url"
            :label="project.urlLabel" />
        </div>

        <!-- Project description -->
        <p
          v-if="project.summary"
          class="not-printing:hidden">
          {{ project.summary }}
        </p>

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
