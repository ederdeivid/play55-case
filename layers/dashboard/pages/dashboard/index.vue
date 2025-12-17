<script setup lang="ts">
const { initFromUrl } = useUrlFilters()
initFromUrl()

useHead({
  title: 'Dashboard - Analytics',
  meta: [
    { name: 'description', content: 'Dashboard de métricas e analytics da plataforma' },
  ],
})
</script>

<template>
  <div class="space-y-8">
    <DashboardHeader />

    <DashboardMetricsGrid />

    <DashboardChartSection />
  </div>
</template>
