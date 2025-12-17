/* eslint-disable max-lines-per-function */
import type { MetricsResponse, AsyncStatus } from '../types'
import { useFiltersStore } from '../stores/filters'

export function useMetrics() {
  const filtersStore = useFiltersStore()
  
  const { data, status, error, refresh } = useFetch<MetricsResponse>('/api/metrics', {
    query: computed(() => ({
      period: filtersStore.period,
    })),
    lazy: false,
    key: computed(() => `metrics-${filtersStore.period}`).value,
  })
  
  const asyncStatus = computed<AsyncStatus>(() => {
    if (status.value === 'pending') return 'loading'
    if (status.value === 'error') return 'error'
    if (status.value === 'success' && !data.value) return 'empty'
    if (status.value === 'success') return 'success'
    return 'idle'
  })
  
  const metrics = computed(() => data.value?.metrics ?? null)
  const chartData = computed(() => data.value?.chartData ?? null)
  
  const metricsArray = computed(() => {
    if (!metrics.value) return []
    return [
      metrics.value.activeUsers,
      metrics.value.revenue,
      metrics.value.conversions,
      metrics.value.growthRate,
    ]
  })
  
  return {
    data,
    metrics,
    metricsArray,
    chartData,
    status: asyncStatus,
    error,
    
    refresh,
    
    isLoading: computed(() => asyncStatus.value === 'loading'),
    isError: computed(() => asyncStatus.value === 'error'),
    isEmpty: computed(() => asyncStatus.value === 'empty'),
    isSuccess: computed(() => asyncStatus.value === 'success'),
  }
}
