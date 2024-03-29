<script setup lang="ts">
  import { computed } from 'vue'

  import Brand from '@/components/Brand.vue'
  import Link from '@/components/Link.vue'
  import Period from '@/components/Period.vue'
  import { ROLE_TYPES } from '@/constants/role_types'
  import type { Org } from '@/resume/org'

  interface Props {
    org: Org
    showFeaturedOnly?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showFeaturedOnly: false,
  })

  const roles = computed(() => props.org.roles)
</script>

<template>
  <div :class="{ 'printing:hidden': showFeaturedOnly && !org.someFeatured }">
    <div class="mb-1 flex flex-row items-center justify-between">
      <Brand
        :id="org.id"
        class="font-medium text-imp"
        :name="org.name" />
      <Link
        v-if="org.url"
        class="text-low"
        :url="org.url" />
    </div>

    <!-- Org description -->
    <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
    <p
      v-if="org.summary"
      class="mb-1 not-printing:hidden"
      v-html="org.summary" />
    <!-- eslint-enable vue/no-v-html -->

    <!-- Roles -->
    <ul>
      <li
        v-for="(role, roleIndex) in roles"
        :key="roleIndex"
        class="mt-1 flex flex-col gap-1 printing:mt-2"
        :class="{ 'printing:hidden': showFeaturedOnly && !role.isFeatured }">
        <div class="flex flex-row items-center gap-ch">
          <span class="flex flex-row items-center gap-ch">
            <!-- Just shows the red dot. -->
            <Period
              v-if="role.period"
              class="printing:hidden"
              v-bind="role.period" />
            <span class="printing:font-medium">{{ role.name }}</span>
          </span>
          <span class="ml-auto text-low printing:hidden">{{
            role.type ? ROLE_TYPES[role.type] : ''
          }}</span>
          <Period
            v-if="role.period"
            class="ml-auto text-low not-printing:hidden"
            v-bind="role.period" />
        </div>

        <!-- Role description -->
        <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
        <p
          v-if="role.summary"
          class="not-printing:hidden"
          v-html="role.summary" />
        <!-- eslint-enable vue/no-v-html -->

        <!-- Highlights -->
        <ul
          class="flex list-disc flex-col pl-indent printing:gap-0.5 not-printing:hidden">
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
