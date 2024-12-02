<!-- eslint-disable vue/no-parsing-error -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFetch } from '@vueuse/core'

// Define a GitHub repository type
interface Repository {
  id: number
  name: string
  description: string
  topics: string[]
}

// User Input for GitHub Organization or Username
const query = ref('') // For GitHub username/org input
const selectedRepo = ref<Repository | null>(null) // Selected repository details
const isRepoPanelOpen = ref(false) // Toggle repo details panel

// Fetch Repositories Based on User Input
useFetch<Repository[]>(
  computed(() => `https://api.github.com/users/${query.value}/repos`),
  { immediate: false }
)

// Filtered repositories based on query input

// Analyze Repository Type and SEO Metrics

// Watch Query Input to Trigger Repository Fetch
watch(query, (newQuery) => {
  if (newQuery) execute()
})

function execute() {
  throw new Error('Function not implemented.')
}
</script>

<template>
  <UDashboardPanel
    v-model="isRepoPanelOpen"
    collapsible
    grow
    side="right"
  >
    <template v-if="selectedRepo">
      <UDashboardNavbar>
        <template #toggle>
          <UDashboardNavbarToggle
            icon="i-heroicons-x-mark"
          />
        </template>
      </UDashboardNavbar>
    <!-- Repository details -->
    </template>
  </UDashboardPanel>
</template>
