<!--
Displays the list of skills, automatically expanding nested skills in parentheses.
-->

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  import type { Skill } from 'reschume/lib/bio'

  import { useResume } from '@/stores/resume'

  const resumeStore = useResume()
  const { bio } = storeToRefs(resumeStore)
  const skills = computed(() => bio.value?.skills ?? [])

  const skillDisplay = (skill: Skill): string => {
    if (typeof skill === 'string') return skill
    return `${skill.name} (+${skill.subskills
      ?.map((subskill) => skillDisplay(subskill))
      .join(', ')})`
  }
</script>
<template>
  <div>
    <h2>Other skills</h2>
    <p>
      <template
        v-for="(skill, skillIndex) in skills"
        :key="skillIndex">
        <span>{{ skillDisplay(skill) }}</span>
        <span v-if="skillIndex < skills.length - 2">, </span>
        <span v-else-if="skillIndex === skills.length - 2"> and </span>
      </template>
    </p>
  </div>
</template>
