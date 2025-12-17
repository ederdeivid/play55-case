<script setup lang="ts">
import { calculatePageRange } from '~/utils/pagination'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const pageRange = computed(() =>
  calculatePageRange(props.currentPage, props.totalPages, 5)
)

const startItem = computed(() =>
  (props.currentPage - 1) * props.pageSize + 1
)

const endItem = computed(() =>
  Math.min(props.currentPage * props.pageSize, props.totalItems)
)

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

<template>
  <nav
    class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3"
    aria-label="Paginação"
  >
    <p class="text-sm text-slate-500">
      Mostrando <span class="font-medium text-slate-900">{{ startItem }}</span>
      a <span class="font-medium text-slate-900">{{ endItem }}</span>
      de <span class="font-medium text-slate-900">{{ totalItems }}</span> resultados
    </p>

    <div class="flex items-center gap-1">
      <button
        type="button"
        :disabled="currentPage === 1"
        class="
          p-2 rounded-lg text-slate-400
          hover:bg-slate-100 hover:text-slate-600
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        "
        aria-label="Primeira página"
        @click="goToPage(1)"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        type="button"
        :disabled="currentPage === 1"
        class="
          p-2 rounded-lg text-slate-400
          hover:bg-slate-100 hover:text-slate-600
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        "
        aria-label="Página anterior"
        @click="goToPage(currentPage - 1)"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        v-for="page in pageRange"
        :key="page"
        type="button"
        :aria-current="page === currentPage ? 'page' : undefined"
        :class="[
          'min-w-10 h-10 px-3 rounded-lg text-sm font-medium',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          page === currentPage
            ? 'bg-blue-600 text-white'
            : 'text-slate-600 hover:bg-slate-100'
        ]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
        type="button"
        :disabled="currentPage === totalPages"
        class="
          p-2 rounded-lg text-slate-400
          hover:bg-slate-100 hover:text-slate-600
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        "
        aria-label="Próxima página"
        @click="goToPage(currentPage + 1)"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      <button
        type="button"
        :disabled="currentPage === totalPages"
        class="
          p-2 rounded-lg text-slate-400
          hover:bg-slate-100 hover:text-slate-600
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        "
        aria-label="Última página"
        @click="goToPage(totalPages)"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>
