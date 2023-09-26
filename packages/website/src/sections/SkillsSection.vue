<!--
Displays the list of skills, automatically expanding nested skills in parentheses.
-->

<script setup lang="ts">
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'

  import type { Skill } from 'recivi'

  import { useResume } from '@/stores/resume'
  import { stringifyList } from '@/utils/string'

  const resumeStore = useResume()
  const { bio } = storeToRefs(resumeStore)

  const skillDisplay = (skill: Skill): string => {
    if (typeof skill === 'string') return skill

    const subskillsText = stringifyList(
      skill.subSkills.map((subSkill) => skillDisplay(subSkill))
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
    <h2
      class="section-heading"
      aria-label="Other skills">
      Other skills
    </h2>

    <p>{{ skillsText }}</p>
  </div>
</template>
