import type { Transaction, TransactionStatus } from '@/layers/dashboard/types'

interface PaginatedData<T> {
  items: T[]
  pagination: {
    currentPage: number
    pageSize: number
    totalItems: number
  }
  totalPages: number
}

export function paginateItems<T>(
  items: T[],
  currentPage: number,
  pageSize: number
): PaginatedData<T> {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  return {
    items: items.slice(startIndex, endIndex),
    pagination: {
      currentPage,
      pageSize,
      totalItems,
    },
    totalPages,
  }
}

interface TransactionStats {
  total: number
  byStatus: Record<TransactionStatus, number>
  totalAmount: number
  averageAmount: number
}

export function calculateTransactionStats(transactions: Transaction[]): TransactionStats {
  const byStatus: Record<TransactionStatus, number> = {
    completed: 0,
    pending: 0,
    failed: 0,
    refunded: 0,
  }

  let totalAmount = 0

  for (const transaction of transactions) {
    byStatus[transaction.status]++
    totalAmount += transaction.amount
  }

  return {
    total: transactions.length,
    byStatus,
    totalAmount,
    averageAmount: transactions.length > 0
      ? Math.round((totalAmount / transactions.length) * 100) / 100
      : 0,
  }
}

export function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function filterTransactionsByStatus(
  transactions: Transaction[],
  status: TransactionStatus | 'all'
): Transaction[] {
  if (status === 'all') return transactions
  return transactions.filter(t => t.status === status)
}
