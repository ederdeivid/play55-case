/* eslint-disable max-lines-per-function */
import { useFiltersStore } from '../stores/filters'
import type { TransactionsResponse, Transaction, AsyncStatus, PaginatedData } from '../types'
import { paginateItems } from '@/domain/transactions/processor'

export function useTransactions(pageSize: number = 10) {
  const filtersStore = useFiltersStore()
  
  const currentPage = ref(1)
  
  const { data, status, error, refresh } = useFetch<TransactionsResponse>('/api/transactions', {
    query: computed(() => ({
      period: filtersStore.period,
    })),
    lazy: false,
    key: computed(() => `transactions-${filtersStore.period}`).value,
  })
  
  watch(() => filtersStore.period, () => {
    currentPage.value = 1
  })
  
  const asyncStatus = computed<AsyncStatus>(() => {
    if (status.value === 'pending') return 'loading'
    if (status.value === 'error') return 'error'
    if (status.value === 'success' && (!data.value || data.value.transactions.length === 0)) return 'empty'
    if (status.value === 'success') return 'success'
    return 'idle'
  })
  
  const paginatedData = computed<PaginatedData<Transaction> | null>(() => {
    if (!data.value) return null
    return paginateItems(data.value.transactions, currentPage.value, pageSize)
  })
  
  const totalPages = computed(() => paginatedData.value?.totalPages ?? 0)
  const transactions = computed(() => paginatedData.value?.items ?? [])
  const totalTransactions = computed(() => data.value?.total ?? 0)
  
  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }
  
  function nextPage() {
    goToPage(currentPage.value + 1)
  }
  
  function previousPage() {
    goToPage(currentPage.value - 1)
  }
  
  function firstPage() {
    goToPage(1)
  }
  
  function lastPage() {
    goToPage(totalPages.value)
  }
  
  return {
    transactions,
    allTransactions: computed(() => data.value?.transactions ?? []),
    totalTransactions,
    status: asyncStatus,
    error,
    
    currentPage: readonly(currentPage),
    totalPages,
    pageSize,
    
    refresh,
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    
    hasNextPage: computed(() => currentPage.value < totalPages.value),
    hasPreviousPage: computed(() => currentPage.value > 1),
    
    isLoading: computed(() => asyncStatus.value === 'loading'),
    isError: computed(() => asyncStatus.value === 'error'),
    isEmpty: computed(() => asyncStatus.value === 'empty'),
    isSuccess: computed(() => asyncStatus.value === 'success'),
  }
}
