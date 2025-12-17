import type { PeriodFilter } from '../../layers/dashboard/types/filters'
import { getTransactions } from '../services/transactions.service'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const period = (query.period as PeriodFilter) || '30d'

  return getTransactions(period)
})
