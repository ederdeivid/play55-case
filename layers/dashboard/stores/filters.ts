/* eslint-disable max-lines-per-function */
import { defineStore } from 'pinia'
import { 
  type PeriodFilter, 
  type DateRange,
  DEFAULT_PERIOD, 
  PERIOD_DAYS_MAP 
} from '../types/filters'

export const useFiltersStore = defineStore('filters', () => {
  const period = ref<PeriodFilter>(DEFAULT_PERIOD)
  
  const periodDays = computed(() => PERIOD_DAYS_MAP[period.value])
  
  const dateRange = computed<DateRange>(() => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - periodDays.value)
    return { start, end }
  })
  
  function setPeriod(newPeriod: PeriodFilter) {
    console.log(newPeriod)
    period.value = newPeriod
  }
  
  function initFromQuery(query: Record<string, string | undefined>) {
    const queryPeriod = query.period as PeriodFilter | undefined
    if (!queryPeriod) return
    if (!isValidPeriod(queryPeriod)) return

    period.value = queryPeriod
  }
  
  function toQuery(): Record<string, string> {
    return {
      period: period.value,
    }
  }
  
  return {
    period,
    
    periodDays,
    dateRange,
    
    setPeriod,
    initFromQuery,
    toQuery,
  }
})

function isValidPeriod(value: string): value is PeriodFilter {
  return ['7d', '30d', '90d'].includes(value)
}
