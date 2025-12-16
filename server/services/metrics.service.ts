import type { MetricsResponse, TimeSeriesDataPoint } from '../../layers/dashboard/types'
import type { PeriodFilter } from '../../layers/dashboard/types/filters'
import { PERIOD_DAYS_MAP } from '../../layers/dashboard/types/filters'
import { calculateTrend, getPeriodMultiplier } from '../../layers/dashboard/domain/metrics/calculator'
import { generateSingleDataPoint } from './metrics/generators'
import { generateArray } from '../utils/array'

export function getMetrics(period: PeriodFilter = '30d'): MetricsResponse {
  const multiplier = getPeriodMultiplier(period)

  const activeUsersValue = Math.round(12547 * multiplier)
  const activeUsersPrevious = Math.round(11203 * multiplier)

  const revenueValue = 89432.50 * multiplier
  const revenuePrevious = 76891.20 * multiplier

  const conversionsValue = Math.round(1847 * multiplier)
  const conversionsPrevious = Math.round(1654 * multiplier)

  return {
    metrics: {
      activeUsers: {
        id: 'active-users',
        label: 'Usuários Ativos',
        value: activeUsersValue,
        previousValue: activeUsersPrevious,
        format: 'number',
        trend: calculateTrend(activeUsersValue, activeUsersPrevious),
        icon: 'users',
      },
      revenue: {
        id: 'revenue',
        label: 'Receita Total',
        value: revenueValue,
        previousValue: revenuePrevious,
        format: 'currency',
        trend: calculateTrend(revenueValue, revenuePrevious),
        icon: 'currency-dollar',
      },
      conversions: {
        id: 'conversions',
        label: 'Conversões',
        value: conversionsValue,
        previousValue: conversionsPrevious,
        format: 'number',
        trend: calculateTrend(conversionsValue, conversionsPrevious),
        icon: 'chart-bar',
      },
      growthRate: {
        id: 'growth-rate',
        label: 'Taxa de Crescimento',
        value: 12.4,
        previousValue: 10.8,
        format: 'percentage',
        trend: calculateTrend(12.4, 10.8),
        icon: 'trending-up',
      },
    },
    chartData: {
      label: 'Usuários Ativos',
      data: generateTimeSeriesData(period),
      color: '#3b82f6',
    },
  }
}

function generateTimeSeriesData(period: PeriodFilter): TimeSeriesDataPoint[] {
  const days = PERIOD_DAYS_MAP[period]
  const endDate = new Date()

  return generateDataPointsList(days, endDate)
}

function generateDataPointsList(days: number, endDate: Date): TimeSeriesDataPoint[] {
  return generateArray(days, (i) => generateSingleDataPoint(endDate, days, i))
}
