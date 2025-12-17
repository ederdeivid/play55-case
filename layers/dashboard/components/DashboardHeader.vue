<script setup lang="ts">
</script>

<template>
  <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-slate-900">
        Dashboard
      </h1>
      <p class="text-sm text-slate-500 mt-1">
        Acompanhe as principais métricas da sua plataforma
      </p>
    </div>
    
    <DashboardPeriodFilter />
  </header>
</template>
