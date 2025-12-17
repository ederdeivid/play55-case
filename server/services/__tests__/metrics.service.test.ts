import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getMetrics } from '../metrics.service'
import type { PeriodFilter } from '../../../layers/dashboard/types/filters'

vi.mock('../../../layers/dashboard/domain/metrics/calculator', () => ({
  calculateTrend: vi.fn((current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return { value: change, direction: change >= 0 ? 'up' : 'down' as const }
  }),
  getPeriodMultiplier: vi.fn((period: PeriodFilter) => {
    const multipliers: Record<PeriodFilter, number> = {
      '7d': 0.25,
      '30d': 1,
      '90d': 3,
    }
    return multipliers[period] || 1
  }),
}))

describe('Metrics Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getMetrics - Casos de Sucesso', () => {
    it('deve retornar métricas com estrutura correta', () => {
      const result = getMetrics('30d')

      expect(result).toHaveProperty('metrics')
      expect(result).toHaveProperty('chartData')
      expect(result.metrics).toHaveProperty('activeUsers')
      expect(result.metrics).toHaveProperty('revenue')
      expect(result.metrics).toHaveProperty('conversions')
      expect(result.metrics).toHaveProperty('growthRate')
    })

    it('deve retornar métricas com valores válidos para período 30d', () => {
      const result = getMetrics('30d')

      expect(result.metrics.activeUsers.value).toBeGreaterThan(0)
      expect(result.metrics.revenue.value).toBeGreaterThan(0)
      expect(result.metrics.conversions.value).toBeGreaterThan(0)
      expect(result.metrics.growthRate.value).toBeGreaterThan(0)
    })

    it('deve retornar métricas com formato correto para cada métrica', () => {
      const result = getMetrics('30d')

      expect(result.metrics.activeUsers.format).toBe('number')
      expect(result.metrics.revenue.format).toBe('currency')
      expect(result.metrics.conversions.format).toBe('number')
      expect(result.metrics.growthRate.format).toBe('percentage')
    })

    it('deve retornar métricas com ícones corretos', () => {
      const result = getMetrics('30d')

      expect(result.metrics.activeUsers.icon).toBe('users')
      expect(result.metrics.revenue.icon).toBe('currency-dollar')
      expect(result.metrics.conversions.icon).toBe('chart-bar')
      expect(result.metrics.growthRate.icon).toBe('trending-up')
    })

    it('deve retornar trend calculado para cada métrica', () => {
      const result = getMetrics('30d')

      expect(['up', 'down', 'neutral']).toContain(result.metrics.activeUsers.trend)
      expect(['up', 'down', 'neutral']).toContain(result.metrics.revenue.trend)
      expect(['up', 'down', 'neutral']).toContain(result.metrics.conversions.trend)
      expect(['up', 'down', 'neutral']).toContain(result.metrics.growthRate.trend)
    })

    it('deve retornar chartData com estrutura correta', () => {
      const result = getMetrics('30d')

      expect(result.chartData).toHaveProperty('label')
      expect(result.chartData).toHaveProperty('data')
      expect(result.chartData).toHaveProperty('color')
      expect(Array.isArray(result.chartData.data)).toBe(true)
      expect(result.chartData.data.length).toBeGreaterThan(0)
    })

    it('deve retornar dados de série temporal com formato correto', () => {
      const result = getMetrics('30d')
      const firstDataPoint = result.chartData.data[0]

      expect(firstDataPoint).toHaveProperty('date')
      expect(firstDataPoint).toHaveProperty('value')
      expect(typeof firstDataPoint.date).toBe('string')
      expect(typeof firstDataPoint.value).toBe('number')
    })
  })

  describe('getMetrics - Diferentes Períodos', () => {
    it('deve retornar valores menores para período 7d', () => {
      const result7d = getMetrics('7d')
      const result30d = getMetrics('30d')

      expect(result7d.metrics.activeUsers.value).toBeLessThan(
        result30d.metrics.activeUsers.value
      )
      expect(result7d.metrics.revenue.value).toBeLessThan(
        result30d.metrics.revenue.value
      )
    })

    it('deve retornar valores maiores para período 90d', () => {
      const result30d = getMetrics('30d')
      const result90d = getMetrics('90d')

      expect(result90d.metrics.activeUsers.value).toBeGreaterThan(
        result30d.metrics.activeUsers.value
      )
      expect(result90d.metrics.revenue.value).toBeGreaterThan(
        result30d.metrics.revenue.value
      )
    })

    it('deve gerar quantidade correta de pontos no chartData para 7d', () => {
      const result = getMetrics('7d')
      expect(result.chartData.data.length).toBe(7)
    })

    it('deve gerar quantidade correta de pontos no chartData para 30d', () => {
      const result = getMetrics('30d')
      expect(result.chartData.data.length).toBe(30)
    })

    it('deve gerar quantidade correta de pontos no chartData para 90d', () => {
      const result = getMetrics('90d')
      expect(result.chartData.data.length).toBe(90)
    })

    it('deve usar período padrão 30d quando não especificado', () => {
      const result = getMetrics()
      expect(result.chartData.data.length).toBe(30)
    })
  })

  describe('getMetrics - Validação de Dados', () => {
    it('deve retornar valores positivos para activeUsers', () => {
      const result = getMetrics('30d')

      expect(result.metrics.activeUsers.value).toBeGreaterThan(0)
      expect(result.metrics.activeUsers.previousValue).toBeGreaterThan(0)
    })

    it('deve retornar valores positivos para revenue', () => {
      const result = getMetrics('30d')

      expect(result.metrics.revenue.value).toBeGreaterThan(0)
      expect(result.metrics.revenue.previousValue).toBeGreaterThan(0)
    })

    it('deve retornar valores numéricos inteiros para activeUsers', () => {
      const result = getMetrics('30d')

      expect(Number.isInteger(result.metrics.activeUsers.value)).toBe(true)
      expect(Number.isInteger(result.metrics.activeUsers.previousValue)).toBe(true)
    })

    it('deve retornar valores numéricos (podem ser decimais) para revenue', () => {
      const result = getMetrics('30d')

      expect(typeof result.metrics.revenue.value).toBe('number')
      expect(typeof result.metrics.revenue.previousValue).toBe('number')
    })

    it('deve retornar datas válidas no chartData', () => {
      const result = getMetrics('30d')

      result.chartData.data.forEach((point) => {
        const date = new Date(point.date)
        expect(date.toString()).not.toBe('Invalid Date')
        expect(point.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      })
    })

    it('deve retornar datas em ordem cronológica crescente', () => {
      const result = getMetrics('30d')
      const dates = result.chartData.data.map(point => new Date(point.date).getTime())

      for (let i = 1; i < dates.length; i++) {
        expect(dates[i]).toBeGreaterThanOrEqual(dates[i - 1])
      }
    })
  })

  describe('getMetrics - Consistência de Dados', () => {
    it('deve retornar os mesmos dados para múltiplas chamadas com mesmo período', () => {
      const result1 = getMetrics('30d')
      const result2 = getMetrics('30d')

      expect(result1.metrics.activeUsers.value).toBe(result2.metrics.activeUsers.value)
      expect(result1.metrics.revenue.value).toBe(result2.metrics.revenue.value)
      expect(result1.chartData.data.length).toBe(result2.chartData.data.length)
    })

    it('deve ter previousValue diferente de value', () => {
      const result = getMetrics('30d')

      expect(result.metrics.activeUsers.value).not.toBe(
        result.metrics.activeUsers.previousValue
      )
      expect(result.metrics.revenue.value).not.toBe(
        result.metrics.revenue.previousValue
      )
    })

    it('deve ter chartData com cor válida', () => {
      const result = getMetrics('30d')

      expect(result.chartData.color).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  describe('getMetrics - Edge Cases', () => {
    it('não deve retornar valores NaN', () => {
      const result = getMetrics('30d')

      expect(Number.isNaN(result.metrics.activeUsers.value)).toBe(false)
      expect(Number.isNaN(result.metrics.revenue.value)).toBe(false)
      expect(Number.isNaN(result.metrics.conversions.value)).toBe(false)
      expect(Number.isNaN(result.metrics.growthRate.value)).toBe(false)

      result.chartData.data.forEach((point) => {
        expect(Number.isNaN(point.value)).toBe(false)
      })
    })

    it('não deve retornar valores Infinity', () => {
      const result = getMetrics('30d')

      expect(Number.isFinite(result.metrics.activeUsers.value)).toBe(true)
      expect(Number.isFinite(result.metrics.revenue.value)).toBe(true)

      result.chartData.data.forEach((point) => {
        expect(Number.isFinite(point.value)).toBe(true)
      })
    })

    it('não deve retornar arrays vazios no chartData', () => {
      const result = getMetrics('30d')

      expect(result.chartData.data.length).toBeGreaterThan(0)
    })

    it('deve ter labels corretos nas métricas', () => {
      const result = getMetrics('30d')

      expect(result.metrics.activeUsers.label).toBe('Usuários Ativos')
      expect(result.metrics.revenue.label).toBe('Receita Total')
      expect(result.metrics.conversions.label).toBe('Conversões')
      expect(result.metrics.growthRate.label).toBe('Taxa de Crescimento')
    })

    it('deve ter IDs únicos para cada métrica', () => {
      const result = getMetrics('30d')
      const ids = [
        result.metrics.activeUsers.id,
        result.metrics.revenue.id,
        result.metrics.conversions.id,
        result.metrics.growthRate.id,
      ]

      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })
})
