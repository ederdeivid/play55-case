<script setup lang="ts">
import { TRANSACTION_STATUS_LABELS, TRANSACTION_TYPE_LABELS } from '@/layers/dashboard/types'

const {
  transactions,
  totalTransactions,
  currentPage,
  totalPages,
  pageSize,
  isLoading,
  isError,
  isEmpty,
  refresh,
  goToPage,
} = useTransactions(10)

const { formatCurrency, formatDateTime } = useFormatters()

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
        <h2 id="transactions-title" class="text-lg font-semibold text-slate-900">
          Transações Recentes
        </h2>
        <p class="text-sm text-slate-500 mt-0.5">
          Lista de todas as transações do período selecionado
        </p>
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
      
      <template v-else>
        <UiDataTable
          :columns="columns"
          caption="Lista de transações recentes"
        >
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
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
            :total-pages="totalPages"
            :total-items="totalTransactions"
            :page-size="pageSize"
            @page-change="goToPage"
          />
        </div>
      </template>
    </UiCard>
  </section>
</template>
