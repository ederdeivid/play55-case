/**
 * Tipos relacionados aos filtros globais do dashboard
 * 
 * Regras de domínio:
 * - O período afeta todas as métricas e listagens
 * - O filtro deve persistir entre navegações
 * - Deve sincronizar com query params da URL
 */

export type PeriodFilter = '7d' | '30d' | '90d'

export interface DateRange {
  start: Date
  end: Date
}

export interface FiltersState {
  period: PeriodFilter
}

export interface FiltersActions {
  setPeriod: (period: PeriodFilter) => void
  getPeriodDays: () => number
  getDateRange: () => DateRange
}

export const PERIOD_OPTIONS: Array<{ value: PeriodFilter; label: string }> = [
  { value: '7d', label: 'Últimos 7 dias' },
  { value: '30d', label: 'Últimos 30 dias' },
  { value: '90d', label: 'Últimos 90 dias' },
] as const

export const DEFAULT_PERIOD: PeriodFilter = '30d'

/**
 * Mapeia período para número de dias
 */
export const PERIOD_DAYS_MAP: Record<PeriodFilter, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
} as const
