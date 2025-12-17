<script setup lang="ts">
import { TRANSACTION_STATUS_LABELS, TRANSACTION_TYPE_LABELS, type Transaction } from '@/layers/dashboard/types'

const {
  allTransactions,
  currentPage,
  pageSize,
  isLoading,
  isError,
  isEmpty,
  refresh,
  goToPage,
} = useTransactions(10)

const { formatCurrency, formatDateTime } = useFormatters()
const route = useRoute()
const router = useRouter()

// Search functionality
const searchQuery = ref('')
const debouncedSearch = ref('')
let debounceTimer: NodeJS.Timeout | null = null

watch(searchQuery, (newValue) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    debouncedSearch.value = newValue
    goToPage(1) // Reset to first page when search changes
  }, 300)
})

// Filter transactions based on search query
const filteredTransactions = computed(() => {
  if (!debouncedSearch.value) return allTransactions.value

  const query = debouncedSearch.value.toLowerCase()
  return allTransactions.value.filter((transaction: Transaction) => {
    return (
      transaction.customerName.toLowerCase().includes(query) ||
      transaction.customerEmail.toLowerCase().includes(query) ||
      transaction.productName.toLowerCase().includes(query) ||
      TRANSACTION_STATUS_LABELS[transaction.status].toLowerCase().includes(query) ||
      TRANSACTION_TYPE_LABELS[transaction.type].toLowerCase().includes(query)
    )
  })
})

// Paginate filtered results
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredTransactions.value.slice(start, end)
})

const filteredTotalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / pageSize)
)

const hasFilteredResults = computed(() =>
  filteredTransactions.value.length > 0
)

// Navigation to details page
function navigateToDetails(transactionId: string) {
  router.push({
    path: `/dashboard/transaction/${transactionId}`,
    query: route.query, // Preserve current URL query params
  })
}

const columns = [
  { key: 'customer', label: 'Cliente', align: 'left' as const },
  { key: 'product', label: 'Produto', align: 'left' as const },
  { key: 'amount', label: 'Valor', align: 'right' as const },
  { key: 'status', label: 'Status', align: 'center' as const },
  { key: 'date', label: 'Data', align: 'right' as const },
]

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  failed: 'bg-red-50 text-red-700 ring-red-600/20',
  refunded: 'bg-slate-50 text-slate-700 ring-slate-600/20',
}
</script>

<template>
  <section aria-labelledby="transactions-title">
    <UiCard :padded="false" class="overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 id="transactions-title" class="text-lg font-semibold text-slate-900">
              Transações Recentes
            </h2>
            <p class="text-sm text-slate-500 mt-0.5">
              Lista de todas as transações do período selecionado
            </p>
          </div>

          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar transações..."
              class="w-full sm:w-64 px-4 py-2 pl-10 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      
      <UiTableSkeleton
        v-if="isLoading"
        :rows="5"
        :columns="5"
      />
      
      <UiErrorState
        v-else-if="isError"
        title="Erro ao carregar transações"
        message="Não foi possível carregar a lista de transações."
        @retry="refresh"
      />
      
      <UiEmptyState
        v-else-if="isEmpty"
        title="Nenhuma transação encontrada"
        description="Não há transações para o período selecionado."
      />

      <UiEmptyState
        v-else-if="!hasFilteredResults"
        title="Nenhum resultado encontrado"
        description="Tente ajustar sua busca."
      />

      <template v-else>
        <UiDataTable
          :columns="columns"
          caption="Lista de transações recentes"
        >
          <tr
            v-for="transaction in paginatedTransactions"
            :key="transaction.id"
            class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
            @click="navigateToDetails(transaction.id)"
          >
            <td class="px-4 py-4">
              <div>
                <p class="font-medium text-slate-900">
                  {{ transaction.customerName }}
                </p>
                <p class="text-xs text-slate-500 mt-0.5">
                  {{ transaction.customerEmail }}
                </p>
              </div>
            </td>
            
            <td class="px-4 py-4">
              <div>
                <p class="text-slate-900">
                  {{ transaction.productName }}
                </p>
                <p class="text-xs text-slate-500 mt-0.5">
                  {{ TRANSACTION_TYPE_LABELS[transaction.type] }}
                </p>
              </div>
            </td>
            
            <td class="px-4 py-4 text-right tabular-nums">
              <span
                :class="[
                  'font-medium',
                  transaction.amount >= 0 ? 'text-slate-900' : 'text-red-600'
                ]"
              >
                {{ formatCurrency(transaction.amount) }}
              </span>
            </td>
            
            <td class="px-4 py-4 text-center">
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset',
                  statusStyles[transaction.status]
                ]"
              >
                {{ TRANSACTION_STATUS_LABELS[transaction.status] }}
              </span>
            </td>
            
            <td class="px-4 py-4 text-right text-slate-500 tabular-nums">
              {{ formatDateTime(transaction.date) }}
            </td>
          </tr>
        </UiDataTable>
        
        <div class="border-t border-slate-200">
          <UiPagination
            :current-page="currentPage"
            :total-pages="filteredTotalPages"
            :total-items="filteredTransactions.length"
            :page-size="pageSize"
            @page-change="goToPage"
          />
        </div>
      </template>
    </UiCard>
  </section>
</template>
