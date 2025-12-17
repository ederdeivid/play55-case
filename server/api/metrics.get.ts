import type { PeriodFilter } from '../../layers/dashboard/types/filters'
import { getMetrics } from '../services/metrics.service'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const period = (query.period as PeriodFilter) || '30d'

  return getMetrics(period)
})
