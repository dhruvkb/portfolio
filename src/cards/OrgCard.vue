<script setup lang="ts">
  import { computed } from 'vue'

  import type { Org } from '@/models/role'
  import { roleTypes } from '@/models/role'

  import Brand from '@/components/Brand.vue'
  import Link from '@/components/Link.vue'
  import Period from '@/components/Period.vue'

  interface Props {
    org: Org
    showFeaturedOnly?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showFeaturedOnly: false,
  })

  const roles = computed(() => (props.showFeaturedOnly ? props.org.featuredRoles : Object.values(props.org.roles)))
</script>

<template>
  <div class="px-page flex flex-col gap-1 printing:px-0">
    <div class="flex flex-row items-center justify-between">
      <Brand
        :id="org.id"
        class="text-lg font-medium text-neutral-900 printing:leading-snug dark:text-neutral-200"
        :name="org.name" />
      <Link
        v-if="org.url"
        class="text-neutral-400 dark:text-neutral-600"
        :dest="org.url"
        :label="`Homepage for ${org.name}`"
        is-plain />
    </div>

    <!-- Org description -->
    <p
      v-if="org.summary"
      class="hidden printing:block">
      {{ org.summary }}
    </p>

    <!-- Roles -->
    <ul class="pl-2 printing:pl-0">
      <li
        v-for="(role, roleIndex) in roles"
        :key="roleIndex"
        class="flex flex-col gap-1 printing:my-2 printing:first-of-type:mt-0 printing:last-of-type:mb-0">
        <div class="flex flex-row items-center gap-4">
          <!-- `PeriodCell` matches the classes on `Icon` in `BrandCell`. -->
          <span class="flex flex-row items-center gap-2">
            <!-- Just shows the red dot. -->
            <Period
              v-if="role.period"
              class="h-[1em] w-[1em] printing:hidden"
              v-bind="role.period" />
            <span class="text-lg printing:font-medium printing:leading-normal">{{ role.name }}</span>
          </span>
          <span class="ml-auto text-neutral-400 printing:hidden dark:text-neutral-600">{{ role.type ? roleTypes[role.type] : '' }}</span>
          <Period
            v-if="role.period"
            class="ml-auto hidden text-neutral-400 printing:flex dark:text-neutral-600"
            v-bind="role.period" />
        </div>

        <!-- Role description -->
        <p
          v-if="role.summary"
          class="hidden printing:block">
          {{ role.summary }}
        </p>

        <!-- Highlights -->
        <ul class="hidden list-disc pl-4 printing:block">
          <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
          <li
            v-for="(highlight, highlightIndex) in role.highlights"
            :key="highlightIndex"
            v-html="highlight" />
          <!-- eslint-enable vue/no-v-html -->
        </ul>
      </li>
    </ul>
  </div>
</template>
