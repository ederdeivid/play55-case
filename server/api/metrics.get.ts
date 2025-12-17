import sleep from '~/utils/sleep'
import type { PeriodFilter } from '../../layers/dashboard/types/filters'
import { getMetrics } from '../services/metrics.service'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const period = (query.period as PeriodFilter) || '30d'

  await sleep(1000)

  return getMetrics(period)
})
