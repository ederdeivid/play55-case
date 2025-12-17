export type MetricFormat = 'number' | 'currency' | 'percentage'
export type MetricTrend = 'up' | 'down' | 'neutral'
export type MetricIcon = 'users' | 'currency-dollar' | 'chart-bar' | 'trending-up'

export interface Metric {
  id: string
  label: string
  value: number
  previousValue: number
  format: MetricFormat
  trend: MetricTrend
  icon: MetricIcon
}

export interface TimeSeriesDataPoint {
  date: string
  value: number
}

export interface ChartData {
  label: string
  data: TimeSeriesDataPoint[]
  color: string
}

export interface MetricsResponse {
  metrics: {
    activeUsers: Metric
    revenue: Metric
    conversions: Metric
    growthRate: Metric
  }
  chartData: ChartData
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty'

export interface AsyncState<T> {
  status: AsyncStatus
  data: T | null
  error: string | null
}

export interface MetricsParams {
  period: import('./filters').PeriodFilter
}
