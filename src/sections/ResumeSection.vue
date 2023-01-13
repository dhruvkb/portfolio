<!--
Renders the résumé in a page-like layout using the dimensions of an A4 page.
-->

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  import type { Epic } from '@/models/project'
  import type { Org } from '@/models/role'

  import { useResume } from '@/stores/resume'

  import { GenericDataDeck } from '@/components/DataDeck.vue'

  import EpicCard from '@/cards/EpicCard.vue'
  import OrgCard from '@/cards/OrgCard.vue'

  import ContactSection from '@/sections/ContactSection.vue'
  import HelloSection from '@/sections/HelloSection.vue'
  import SkillsSection from '@/sections/SkillsSection.vue'

  const EpicDeck = GenericDataDeck<Epic>()
  const OrgDeck = GenericDataDeck<Org>()

  const resumeStore = useResume()
  const { epics, orgs } = storeToRefs(resumeStore)

  const orgList = computed(() =>
    orgs.value.filter((org) => org.featuredRoles.length)
  )
  const epicList = computed(() =>
    epics.value.filter((epic) => epic.featuredProjects.length)
  )
</script>

<template>
  <section
    class="hidden font-sans print:block lg:block"
    aria-label="Preview">
    <div
      class="print mx-auto flex h-[297mm] w-[210mm] items-center justify-center border border-neutral-200 bg-white text-resume shadow-lg dark:border-neutral-600 dark:bg-black print:m-0 print:border-none print:shadow-none">
      <!-- Page content -->
      <div class="mx-6 box-content grid w-full grid-cols-2 gap-x-4 gap-y-2">
        <HelloSection />

        <ContactSection />

        <!-- Left pane -->
        <div class="flex h-full flex-col justify-between gap-1">
          <div>
            <h2>Projects</h2>
            <EpicDeck
              code="project"
              :items="epicList">
              <template #project="{ item: epic }">
                <EpicCard
                  :epic="epic"
                  show-featured-only />
              </template>
            </EpicDeck>
          </div>

          <SkillsSection />
        </div>

        <!-- Right pane -->
        <div>
          <h2>Roles</h2>
          <OrgDeck
            code="role"
            :items="orgList">
            <template #role="{ item: org }">
              <OrgCard
                :org="org"
                show-featured-only />
            </template>
          </OrgDeck>
        </div>
      </div>
    </div>
  </section>
</template>
