import type { TransactionsResponse, Transaction } from '../../layers/dashboard/types'
import type { PeriodFilter } from '../../layers/dashboard/types/filters'
import { PERIOD_DAYS_MAP } from '../../layers/dashboard/types/filters'
import { generateTransaction, sortTransactionsByDate } from './transactions/generators'
import { TRANSACTION_CONFIG } from './transactions/constants'
import { generateArray } from '../utils/array'

export function getTransactions(period: PeriodFilter = '30d'): TransactionsResponse {
  const transactions = generateMockTransactions(period)

  return {
    transactions,
    total: transactions.length,
  }
}

function calculateTotalTransactions(days: number): number {
  return days * TRANSACTION_CONFIG.TRANSACTIONS_PER_DAY
}

function generateTransactionsList(total: number, endDate: Date): Transaction[] {
  return generateArray(total, (i) => generateTransaction(i, endDate))
}

function generateMockTransactions(period: PeriodFilter): Transaction[] {
  const days = PERIOD_DAYS_MAP[period]
  const totalTransactions = calculateTotalTransactions(days)
  const endDate = new Date()

  const transactions = generateTransactionsList(totalTransactions, endDate)

  return sortTransactionsByDate(transactions)
}
