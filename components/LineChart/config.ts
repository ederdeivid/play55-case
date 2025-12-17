/* eslint-disable max-lines-per-function */
import type { ChartOptions } from 'chart.js'

export interface ChartTheme {
  tooltip: {
    backgroundColor: string
    titleColor: string
    bodyColor: string
  }
  scales: {
    grid: string
    ticks: string
  }
}

export const DEFAULT_CHART_THEME: ChartTheme = {
  tooltip: {
    backgroundColor: '#1e293b',
    titleColor: '#f8fafc',
    bodyColor: '#f8fafc',
  },
  scales: {
    grid: '#f1f5f9',
    ticks: '#94a3b8',
  },
}

export function createLineChartOptions(
  formatValue: (value: number) => string,
  theme: ChartTheme = DEFAULT_CHART_THEME
): ChartOptions<'line'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.tooltip.backgroundColor,
        titleColor: theme.tooltip.titleColor,
        bodyColor: theme.tooltip.bodyColor,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 12,
          weight: 'normal',
        },
        bodyFont: {
          size: 14,
          weight: 'bold',
        },
        callbacks: {
          label: (context) => formatValue(context.parsed.y ?? 0),
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme.scales.ticks,
          font: {
            size: 11,
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: theme.scales.grid,
        },
        ticks: {
          color: theme.scales.ticks,
          font: {
            size: 11,
          },
          callback: (value) => formatValue(value as number),
        },
        border: {
          display: false,
        },
      },
    },
  }
}

export interface LineDatasetStyle {
  borderColor: string
  backgroundColor: string
  borderWidth: number
  tension: number
  pointRadius: number
  pointHoverRadius: number
  pointHoverBorderColor: string
  pointHoverBorderWidth: number
}

export function createLineDatasetStyle(color: string): LineDatasetStyle {
  return {
    borderColor: color,
    backgroundColor: `${color}15`,
    borderWidth: 2,
    tension: 0.4,
    pointRadius: 0,
    pointHoverRadius: 6,
    pointHoverBorderColor: '#fff',
    pointHoverBorderWidth: 2,
  }
}
