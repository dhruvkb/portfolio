<script setup lang="ts">
  import { ref } from 'vue'

  import { useIcon } from '@/composables/icon'

  const success = ref<boolean | undefined>(undefined)
  const copy = () => {
    const url = document.location.href
    navigator.clipboard
      .writeText(url)
      .then(() => {
        success.value = true
        setTimeout(() => {
          success.value = undefined
        }, 3000 /* milliseconds */)
      })
      .catch(() => {
        success.value = false
      })
  }

  const { getIcon } = useIcon()
</script>

<template>
  <button
    type="button"
    class="group underline hover:italic hover:text-imp"
    aria-label="Share post URL"
    @click="copy">
    <!-- The two strings should have the same length for the best effect. -->
    <template v-if="success">share the copied URL</template>
    <template v-else>copy & share the URL</template>

    <component
      :is="getIcon(success ? 'check' : 'share')"
      class="ml-1 inline-block"
      :class="success ? 'text-lime-500' : 'text-red-500'"
      aria-hidden="true" />
  </button>
</template>
