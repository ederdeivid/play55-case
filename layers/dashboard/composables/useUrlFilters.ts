/* eslint-disable max-lines-per-function */
import type { PeriodFilter } from '../types/filters'
import { useFiltersStore } from '../stores/filters'

export function useUrlFilters() {
  const route = useRoute()
  const router = useRouter()
  const filtersStore = useFiltersStore()

  function initFromUrl() {
    const queryPeriod = route.query.period as string | undefined
    if (!queryPeriod) return
    if (!isValidPeriod(queryPeriod)) return

    filtersStore.setPeriod(queryPeriod)
  }

  function syncToUrl() {
    const currentQuery = { ...route.query }
    const storeQuery = filtersStore.toQuery()

    if (currentQuery.period === storeQuery.period) return

    router.replace({
      query: {
        ...currentQuery,
        ...storeQuery,
      },
    })
  }

  function setPeriod(period: PeriodFilter) {
    filtersStore.setPeriod(period)
    syncToUrl()
  }

  watch(() => route.query.period, (newPeriod) => {
    if (typeof newPeriod !== 'string') return
    if (!isValidPeriod(newPeriod)) return
    if (filtersStore.period === newPeriod) return

    filtersStore.setPeriod(newPeriod)
  })

  return {
    initFromUrl,
    syncToUrl,
    setPeriod,

    period: ref(filtersStore.period),
    periodDays: computed(() => filtersStore.periodDays),
    dateRange: computed(() => filtersStore.dateRange),
  }
}

function isValidPeriod(value: string): value is PeriodFilter {
  return ['7d', '30d', '90d'].includes(value)
}
