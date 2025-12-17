<script setup lang="ts">
import { TRANSACTION_STATUS_LABELS, TRANSACTION_TYPE_LABELS } from '@/layers/dashboard/types'

const route = useRoute()
const router = useRouter()
const transactionId = route.params.transactionId as string

const { allTransactions, isLoading, isError } = useTransactions(10)
const { formatCurrency, formatDateTime } = useFormatters()

const transaction = computed(() =>
  allTransactions.value.find((t) => t.id === transactionId)
)

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  failed: 'bg-red-50 text-red-700 ring-red-600/20',
  refunded: 'bg-slate-50 text-slate-700 ring-slate-600/20',
}

function goBack() {
  router.push({
    path: '/dashboard',
    query: route.query,
  })
}

useHead({
  title: `Transação ${transactionId} - Analytics`,
  meta: [
    { name: 'description', content: 'Detalhes da transação' },
  ],
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="goBack"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Voltar
      </button>

      <h1 class="text-2xl font-bold text-slate-900">
        Detalhes da Transação
      </h1>
    </div>

    <UiTableSkeleton
      v-if="isLoading"
      :rows="1"
      :columns="2"
    />

    <UiErrorState
      v-else-if="isError"
      title="Erro ao carregar transação"
      message="Não foi possível carregar os detalhes da transação."
    />

    <UiEmptyState
      v-else-if="!transaction"
      title="Transação não encontrada"
      description="A transação solicitada não existe ou não pôde ser encontrada."
    />

    <UiCard v-else class="overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 class="text-lg font-semibold text-slate-900">
          Informações da Transação
        </h2>
      </div>

      <div class="divide-y divide-slate-200">
        <div class="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="text-sm font-medium text-slate-500">
            ID da Transação
          </div>
          <div class="sm:col-span-2 text-sm text-slate-900 font-mono">
            {{ transaction.id }}
          </div>
        </div>

        <div class="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="text-sm font-medium text-slate-500">
            Cliente
          </div>
          <div class="sm:col-span-2">
            <p class="text-sm font-medium text-slate-900">
              {{ transaction.customerName }}
            </p>
            <p class="text-sm text-slate-500 mt-0.5">
              {{ transaction.customerEmail }}
            </p>
          </div>
        </div>

        <div class="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="text-sm font-medium text-slate-500">
            Produto
          </div>
          <div class="sm:col-span-2">
            <p class="text-sm text-slate-900">
              {{ transaction.productName }}
            </p>
            <p class="text-sm text-slate-500 mt-0.5">
              {{ TRANSACTION_TYPE_LABELS[transaction.type] }}
            </p>
          </div>
        </div>

        <div class="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="text-sm font-medium text-slate-500">
            Valor
          </div>
          <div class="sm:col-span-2">
            <span
              :class="[
                'text-lg font-semibold tabular-nums',
                transaction.amount >= 0 ? 'text-slate-900' : 'text-red-600'
              ]"
            >
              {{ formatCurrency(transaction.amount) }}
            </span>
          </div>
        </div>

        <div class="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="text-sm font-medium text-slate-500">
            Status
          </div>
          <div class="sm:col-span-2">
            <span
              :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ring-1 ring-inset',
                statusStyles[transaction.status]
              ]"
            >
              {{ TRANSACTION_STATUS_LABELS[transaction.status] }}
            </span>
          </div>
        </div>

        <div class="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="text-sm font-medium text-slate-500">
            Data
          </div>
          <div class="sm:col-span-2 text-sm text-slate-900 tabular-nums">
            {{ formatDateTime(transaction.date) }}
          </div>
        </div>
      </div>
    </UiCard>
  </div>
</template>
