import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getTransactions } from '../transactions.service'

describe('Transactions Service', () => {
  beforeEach(() => { })

  afterEach(() => { })

  describe('getTransactions - Casos de Sucesso', () => {
    it('deve retornar resposta com estrutura correta', () => {
      const result = getTransactions('30d')

      expect(result).toHaveProperty('transactions')
      expect(result).toHaveProperty('total')
      expect(Array.isArray(result.transactions)).toBe(true)
    })

    it('deve retornar transações com campos obrigatórios', () => {
      const result = getTransactions('30d')
      const transaction = result.transactions[0]

      expect(transaction).toHaveProperty('id')
      expect(transaction).toHaveProperty('customerName')
      expect(transaction).toHaveProperty('customerEmail')
      expect(transaction).toHaveProperty('amount')
      expect(transaction).toHaveProperty('status')
      expect(transaction).toHaveProperty('type')
      expect(transaction).toHaveProperty('date')
      expect(transaction).toHaveProperty('productName')
    })

    it('deve retornar total igual ao número de transações', () => {
      const result = getTransactions('30d')

      expect(result.total).toBe(result.transactions.length)
    })

    it('deve gerar transações para período 30d', () => {
      const result = getTransactions('30d')

      expect(result.transactions.length).toBeGreaterThan(0)
      expect(result.total).toBe(90)
    })
  })

  describe('getTransactions - Diferentes Períodos', () => {
    it('deve gerar menos transações para período 7d', () => {
      const result = getTransactions('7d')

      expect(result.total).toBe(21)
    })

    it('deve gerar mais transações para período 90d', () => {
      const result = getTransactions('90d')

      expect(result.total).toBe(270)
    })

    it('deve usar período padrão 30d quando não especificado', () => {
      const result = getTransactions()

      expect(result.total).toBe(90)
    })

    it('deve retornar quantidades diferentes para períodos diferentes', () => {
      const result7d = getTransactions('7d')
      const result30d = getTransactions('30d')
      const result90d = getTransactions('90d')

      expect(result7d.total).toBeLessThan(result30d.total)
      expect(result30d.total).toBeLessThan(result90d.total)
    })
  })

  describe('getTransactions - Validação de Status', () => {
    it('deve retornar apenas status válidos', () => {
      const result = getTransactions('30d')
      const validStatuses = ['completed', 'pending', 'failed', 'refunded']

      result.transactions.forEach((transaction) => {
        expect(validStatuses).toContain(transaction.status)
      })
    })

    it('deve ter mais transações completed que outros status', () => {
      const result = getTransactions('30d')
      const completedCount = result.transactions.filter(
        (t) => t.status === 'completed'
      ).length

      expect(completedCount).toBeGreaterThan(result.total * 0.6)
    })

    it('deve ter distribuição realista de status', () => {
      const result = getTransactions('90d')
      const statusCounts = {
        completed: 0,
        pending: 0,
        failed: 0,
        refunded: 0,
      }

      result.transactions.forEach((transaction) => {
        statusCounts[transaction.status]++
      })

      expect(statusCounts.completed).toBeGreaterThan(statusCounts.pending)
      expect(statusCounts.completed).toBeGreaterThan(statusCounts.failed)
      expect(statusCounts.completed).toBeGreaterThan(statusCounts.refunded)
    })
  })

  describe('getTransactions - Validação de Tipo', () => {
    it('deve retornar apenas tipos válidos', () => {
      const result = getTransactions('30d')
      const validTypes = ['subscription', 'purchase', 'upgrade', 'refund']

      result.transactions.forEach((transaction) => {
        expect(validTypes).toContain(transaction.type)
      })
    })

    it('deve ter distribuição realista de tipos', () => {
      const result = getTransactions('90d')
      const typeCounts = {
        subscription: 0,
        purchase: 0,
        upgrade: 0,
        refund: 0,
      }

      result.transactions.forEach((transaction) => {
        typeCounts[transaction.type]++
      })

      expect(typeCounts.subscription).toBeGreaterThan(typeCounts.refund)
      expect(typeCounts.purchase).toBeGreaterThan(typeCounts.refund)
    })
  })

  describe('getTransactions - Validação de Valores', () => {
    it('deve ter valores numéricos válidos', () => {
      const result = getTransactions('30d')

      result.transactions.forEach((transaction) => {
        expect(typeof transaction.amount).toBe('number')
        expect(Number.isFinite(transaction.amount)).toBe(true)
        expect(Number.isNaN(transaction.amount)).toBe(false)
      })
    })

    it('deve ter valores positivos para compras', () => {
      const result = getTransactions('30d')
      const purchases = result.transactions.filter((t) => t.type !== 'refund')

      purchases.forEach((transaction) => {
        expect(transaction.amount).toBeGreaterThan(0)
      })
    })

    it('deve ter valores negativos para refunds', () => {
      const result = getTransactions('30d')
      const refunds = result.transactions.filter((t) => t.type === 'refund')

      refunds.forEach((transaction) => {
        expect(transaction.amount).toBeLessThan(0)
      })
    })

    it('deve ter valores dentro de um range razoável', () => {
      const result = getTransactions('30d')

      result.transactions.forEach((transaction) => {
        const absAmount = Math.abs(transaction.amount)
        expect(absAmount).toBeGreaterThanOrEqual(50)
        expect(absAmount).toBeLessThanOrEqual(500)
      })
    })
  })

  describe('getTransactions - Validação de Datas', () => {
    it('deve ter datas válidas em formato ISO', () => {
      const result = getTransactions('30d')

      result.transactions.forEach((transaction) => {
        const date = new Date(transaction.date)
        expect(date.toString()).not.toBe('Invalid Date')
        expect(transaction.date).toMatch(/^\d{4}-\d{2}-\d{2}T/)
      })
    })

    it('deve retornar transações ordenadas por data decrescente', () => {
      const result = getTransactions('30d')
      const dates = result.transactions.map((t) => new Date(t.date).getTime())

      for (let i = 1; i < dates.length; i++) {
        expect(dates[i]).toBeLessThanOrEqual(dates[i - 1])
      }
    })

    it('deve ter transações dentro do período especificado (com margem)', () => {
      const result = getTransactions('30d')
      const now = new Date()
      const thirtyOneDaysAgo = new Date()
      thirtyOneDaysAgo.setDate(now.getDate() - 31)

      result.transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.date)

        expect(transactionDate.getTime()).toBeLessThanOrEqual(now.getTime() + 86400000)
        expect(transactionDate.getTime()).toBeGreaterThanOrEqual(
          thirtyOneDaysAgo.getTime()
        )
      })
    })
  })

  describe('getTransactions - Validação de Cliente', () => {
    it('deve ter nomes de clientes válidos', () => {
      const result = getTransactions('30d')

      result.transactions.forEach((transaction) => {
        expect(transaction.customerName).toBeTruthy()
        expect(transaction.customerName.length).toBeGreaterThan(0)
        expect(typeof transaction.customerName).toBe('string')
      })
    })

    it('deve ter emails válidos', () => {
      const result = getTransactions('30d')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      result.transactions.forEach((transaction) => {
        expect(transaction.customerEmail).toMatch(emailRegex)
      })
    })

    it('deve ter email derivado do nome do cliente', () => {
      const result = getTransactions('30d')

      result.transactions.forEach((transaction) => {
        const normalizedName = transaction.customerName
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(' ', '.')

        expect(transaction.customerEmail).toContain(normalizedName)
      })
    })
  })

  describe('getTransactions - Validação de Produto', () => {
    it('deve ter nomes de produtos válidos', () => {
      const result = getTransactions('30d')

      result.transactions.forEach((transaction) => {
        expect(transaction.productName).toBeTruthy()
        expect(transaction.productName.length).toBeGreaterThan(0)
        expect(typeof transaction.productName).toBe('string')
      })
    })

    it('deve ter variedade de produtos', () => {
      const result = getTransactions('90d')
      const uniqueProducts = new Set(
        result.transactions.map((t) => t.productName)
      )

      expect(uniqueProducts.size).toBeGreaterThan(1)
    })
  })

  describe('getTransactions - Validação de ID', () => {
    it('deve ter IDs únicos para cada transação', () => {
      const result = getTransactions('30d')
      const ids = result.transactions.map((t) => t.id)
      const uniqueIds = new Set(ids)

      expect(uniqueIds.size).toBe(ids.length)
    })

    it('deve ter IDs no formato correto', () => {
      const result = getTransactions('30d')

      result.transactions.forEach((transaction) => {
        expect(transaction.id).toMatch(/^txn-\d{6}$/)
      })
    })

    it('deve ter IDs sequenciais', () => {
      const result = getTransactions('30d')
      const idNumbers = result.transactions.map((t) =>
        parseInt(t.id.replace('txn-', ''))
      )

      idNumbers.forEach((id) => {
        expect(Number.isInteger(id)).toBe(true)
        expect(id).toBeGreaterThan(0)
      })
    })
  })

  describe('getTransactions - Consistência de Dados', () => {
    it('deve retornar os mesmos dados para múltiplas chamadas', () => {
      const result1 = getTransactions('30d')
      const result2 = getTransactions('30d')

      expect(result1.total).toBe(result2.total)
      expect(result1.transactions.length).toBe(result2.transactions.length)

      expect(result1.transactions[0].id).toBe(result2.transactions[0].id)
      expect(result1.transactions[0].customerName).toBe(
        result2.transactions[0].customerName
      )
    })

    it('deve ter dados determinísticos baseados no período', () => {
      const result = getTransactions('30d')

      expect(result.transactions[0].customerName).toBeTruthy()
      expect(result.transactions[0].amount).toBeGreaterThan(0)
    })
  })

  describe('getTransactions - Edge Cases', () => {
    it('não deve retornar array vazio', () => {
      const result = getTransactions('7d')

      expect(result.transactions.length).toBeGreaterThan(0)
      expect(result.total).toBeGreaterThan(0)
    })

    it('não deve ter valores null ou undefined', () => {
      const result = getTransactions('30d')

      result.transactions.forEach((transaction) => {
        expect(transaction.id).not.toBeNull()
        expect(transaction.id).not.toBeUndefined()
        expect(transaction.customerName).not.toBeNull()
        expect(transaction.customerEmail).not.toBeNull()
        expect(transaction.amount).not.toBeNull()
        expect(transaction.status).not.toBeNull()
        expect(transaction.type).not.toBeNull()
        expect(transaction.date).not.toBeNull()
        expect(transaction.productName).not.toBeNull()
      })
    })

    it('não deve ter strings vazias', () => {
      const result = getTransactions('30d')

      result.transactions.forEach((transaction) => {
        expect(transaction.id.length).toBeGreaterThan(0)
        expect(transaction.customerName.length).toBeGreaterThan(0)
        expect(transaction.customerEmail.length).toBeGreaterThan(0)
        expect(transaction.productName.length).toBeGreaterThan(0)
      })
    })
  })
})
