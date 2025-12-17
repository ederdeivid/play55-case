import sleep from '~/utils/sleep'
import type { PeriodFilter } from '../../layers/dashboard/types/filters'
import { getTransactions } from '../services/transactions.service'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const period = (query.period as PeriodFilter) || '30d'

  sleep(500)

  return getTransactions(period)
})
