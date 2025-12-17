<script setup lang="ts">
const { metricsArray, isLoading, isError, isEmpty, refresh } = useMetrics()
</script>

<template>
  <section aria-labelledby="metrics-title">
    <h2 id="metrics-title" class="sr-only">
      Métricas do Dashboard
    </h2>
    
    <div
      v-if="isLoading"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      role="status"
      aria-label="Carregando métricas..."
    >
      <MetricCardSkeleton v-for="i in 4" :key="i" />
    </div>
    
    <UiErrorState
      v-else-if="isError"
      title="Erro ao carregar métricas"
      message="Não foi possível carregar as métricas do dashboard."
      @retry="refresh"
    />
    
    <UiEmptyState
      v-else-if="isEmpty"
      title="Sem métricas disponíveis"
      description="Não há dados de métricas para o período selecionado."
    />
    
    <div
      v-else
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <DashboardDashMetricCard
        v-for="metric in metricsArray"
        :key="metric.id"
        :metric="metric"
      />
    </div>
  </section>
</template>
