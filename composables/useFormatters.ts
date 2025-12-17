/* eslint-disable max-lines-per-function */
import type { MetricFormat } from '../layers/dashboard/types'

export function useFormatters() {
  const locale = 'pt-BR'

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  function formatNumber(value: number): string {
    return new Intl.NumberFormat(locale).format(value)
  }

  function formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)
  }

  function formatDateShort(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
    }).format(date)
  }

  function formatDateTime(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  function formatMetricValue(value: number, format: MetricFormat): string {
    switch (format) {
      case 'currency':
        return formatCurrency(value)
      case 'percentage':
        return formatPercentage(value)
      case 'number':
      default:
        return formatNumber(value)
    }
  }

  function formatChange(current: number, previous: number): string {
    if (previous === 0) return '+0%'
    const change = ((current - previous) / previous) * 100
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  return {
    formatCurrency,
    formatNumber,
    formatPercentage,
    formatDate,
    formatDateShort,
    formatDateTime,
    formatMetricValue,
    formatChange,
  }
}
