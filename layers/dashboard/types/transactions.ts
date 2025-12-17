/**
 * Tipos relacionados às transações/listagem do dashboard
 * 
 * Regras de domínio:
 * - Transações são filtradas pelo período global
 * - Paginação é client-side (dados carregados e paginados no front)
 * - Status define o estado visual da transação
 */

export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded'
export type TransactionType = 'purchase' | 'subscription' | 'refund' | 'upgrade'

export interface Transaction {
  id: string
  customerName: string
  customerEmail: string
  amount: number
  status: TransactionStatus
  type: TransactionType
  date: string // ISO date string
  productName: string
}

export interface TransactionsResponse {
  transactions: Transaction[]
  total: number
}

export interface TransactionsParams {
  period: import('./filters').PeriodFilter
}

/**
 * Estado de paginação client-side
 */
export interface PaginationState {
  currentPage: number
  pageSize: number
  totalItems: number
}

export interface PaginatedData<T> {
  items: T[]
  pagination: PaginationState
  totalPages: number
}

/**
 * Labels para status de transação
 */
export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
  completed: 'Concluída',
  pending: 'Pendente',
  failed: 'Falhou',
  refunded: 'Reembolsada',
} as const

/**
 * Labels para tipo de transação
 */
export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  purchase: 'Compra',
  subscription: 'Assinatura',
  refund: 'Reembolso',
  upgrade: 'Upgrade',
} as const
