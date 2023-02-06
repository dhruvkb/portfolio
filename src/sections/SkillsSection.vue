<!--
Displays the list of skills, automatically expanding nested skills in parentheses.
-->

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  import type { Skill } from 'reschume/lib/bio'

  import { useResume } from '@/stores/resume'
  import { stringifyList } from '@/utils/string'

  const resumeStore = useResume()
  const { bio } = storeToRefs(resumeStore)

  const skillDisplay = (skill: Skill): string => {
    if (typeof skill === 'string') return skill

    if (skill.subskills === undefined || skill.subskills.length === 0)
      return skill.name

    const subskillsText = stringifyList(
      skill.subskills.map((subskill) => skillDisplay(subskill))
    )
    return `${skill.name} (+${subskillsText})`
  }

  const skillsText = computed(() => {
    const skills = bio.value?.skills?.map((skill) => skillDisplay(skill))
    if (skills) return stringifyList(skills, ' and ')
    return undefined
  })
</script>
<template>
  <div v-if="skillsText">
    <h2 aria-label="Other skills">Other skills</h2>

    <p>{{ skillsText }}</p>
  </div>
</template>
