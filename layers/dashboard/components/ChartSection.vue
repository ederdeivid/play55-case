<script setup lang="ts">
import { useMetrics } from '@/layers/dashboard/composables/useMetrics'

const { chartData, isLoading, isError, isEmpty, refresh } = useMetrics()
</script>

<template>
  <section aria-labelledby="chart-title">
    <UiCard class="h-full">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 id="chart-title" class="text-lg font-semibold text-slate-900">
            Evolução de Usuários
          </h2>
          <p class="text-sm text-slate-500 mt-0.5">
            Acompanhe o crescimento ao longo do período selecionado
          </p>
        </div>
      </div>
      
      <div
        v-if="isLoading"
        class="h-75 flex items-center justify-center"
        role="status"
        aria-label="Carregando gráfico..."
      >
        <div class="flex flex-col items-center gap-3">
          <div class="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span class="text-sm text-slate-500">Carregando gráfico...</span>
        </div>
      </div>
      
      <UiErrorState
        v-else-if="isError"
        title="Erro ao carregar gráfico"
        message="Não foi possível carregar os dados do gráfico."
        @retry="refresh"
      />
      
      <UiEmptyState
        v-else-if="isEmpty || !chartData"
        title="Sem dados para exibir"
        description="Não há dados disponíveis para o período selecionado."
      />
      
      <div v-else class="h-75">
        <DashboardDashLineChart :data="chartData" />
      </div>
    </UiCard>
  </section>
</template>
