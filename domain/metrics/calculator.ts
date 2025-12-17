import type { MetricTrend } from '@/layers/dashboard/types'

export function calculateTrend(currentValue: number, previousValue: number): MetricTrend {
  if (currentValue > previousValue) return 'up'
  if (currentValue < previousValue) return 'down'
  return 'neutral'
}

export function calculatePercentageChange(currentValue: number, previousValue: number): number {
  if (previousValue === 0) return 0
  const change = ((currentValue - previousValue) / previousValue) * 100
  return Math.round(change * 10) / 10
}

export function getPeriodMultiplier(period: '7d' | '30d' | '90d'): number {
  const multipliers = {
    '7d': 0.25,
    '30d': 1.0,
    '90d': 3.0,
  }
  return multipliers[period]
}

interface SeriesSummary {
  total: number
  average: number
  min: number
  max: number
}

export function calculateSeriesSummary(data: Array<{ value: number }>): SeriesSummary {
  if (data.length === 0) {
    return { total: 0, average: 0, min: 0, max: 0 }
  }

  const values = data.map(d => d.value)
  const total = values.reduce((sum, v) => sum + v, 0)

  return {
    total,
    average: Math.round(total / values.length),
    min: Math.min(...values),
    max: Math.max(...values),
  }
}
