<page>
  title: Print
</page>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  import { useResume } from '@/stores/resume'

  import { useIcon } from '@/composables/icon'

  import EpicCard from '@/cards/EpicCard.vue'
  import OrgCard from '@/cards/OrgCard.vue'

  import ContactSection from '@/sections/ContactSection.vue'
  import HelloSection from '@/sections/HelloSection.vue'
  import SkillsSection from '@/sections/SkillsSection.vue'

  const resumeStore = useResume()
  const { epics, orgs } = storeToRefs(resumeStore)
  const sections = computed(() => [
    {
      code: 'role',
      items: orgs.value.filter((org) => org.featuredRoles.length),
    },
    {
      code: 'project',
      items: epics.value.filter((epic) => epic.featuredProjects.length),
    },
  ])

  const print = () => {
    if (window) window.print()
  }

  const { getIconPaths } = useIcon()
</script>

<template>
  <!-- TODO: Merge page with `ResumeSection` -->

  <div class="px-page py-page print:hidden">
    <p class="body-text mb-6">
      To get a copy of my résumé, you can print this page.
    </p>
    <p class="note-para mb-6">
      For best results, use <strong>A4-sized</strong> paper and remove your custom margins.
    </p>

    <button
      class="group mr-4 inline-flex flex-row gap-1 hover:underline"
      @click="print">
      <span class="text-xs font-semibold uppercase">
        Print
      </span>
      <Icon
        class="inline text-red-500 transition-transform duration-100 group-hover:-translate-y-1"
        :paths="getIconPaths('print')" />
    </button>

    <Link
      arrow="down"
      label="Résumé as PDF"
      dest="https://dhruvkb.github.io/resume/"
      arrow-style="s">
      Download PDF
    </Link>
  </div>

  <!-- Page layout -->
  <div class="print my-8 mx-auto hidden h-[297mm] w-[210mm] items-center justify-center border border-neutral-200 bg-white text-[12px] shadow-lg dark:border-neutral-600 dark:bg-black print:m-0 print:flex print:border-none print:shadow-none lg:flex">
    <!-- Page content -->
    <div class="mx-6 box-content grid w-full grid-cols-2 gap-x-4 gap-y-2">
      <HelloSection />

      <ContactSection />

      <!-- Left pane -->
      <div class="flex h-full flex-col justify-between gap-1">
        <div>
          <h2>Projects</h2>
          <DataDeck v-bind="sections[1]">
            <template #project="{ item: epic }">
              <EpicCard
                :epic="epic"
                show-featured-only />
            </template>
          </DataDeck>
        </div>

        <SkillsSection />
      </div>

      <!-- Right pane -->
      <div>
        <h2>Roles</h2>
        <DataDeck v-bind="sections[0]">
          <template #role="{ item: org }">
            <OrgCard
              :org="org"
              show-featured-only />
          </template>
        </DataDeck>
      </div>
    </div>
  </div>
</template>

<style>
  @import "@/styles/print.pcss";
</style>
