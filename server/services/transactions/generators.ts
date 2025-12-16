import type { Transaction, TransactionStatus, TransactionType } from '../../../layers/dashboard/types'
import { seededRandom, selectRandomItem, selectByProbability } from '../../utils/random'
import { generateDateWithOffset } from '../../utils/date'
import { generateEmailFromName, generateId } from '../../utils/string'
import { sortByDateDesc } from '../../utils/array'
import {
  CUSTOMER_NAMES,
  PRODUCT_NAMES,
  STATUS_DISTRIBUTION,
  TYPE_DISTRIBUTION,
  AMOUNT_CONFIG,
  TRANSACTION_CONFIG,
} from './constants'

function generateTransactionDate(
  endDate: Date,
  index: number,
  transactionsPerDay: number
): Date {
  const daysOffset = Math.floor(index / transactionsPerDay)
  const hoursSeed = seededRandom(index)
  const minutesSeed = seededRandom(index + 1000)

  return generateDateWithOffset(endDate, daysOffset, hoursSeed, minutesSeed)
}

function selectTransactionStatus(seed: number): TransactionStatus {
  return selectByProbability(seed, STATUS_DISTRIBUTION)
}

function selectTransactionType(seed: number): TransactionType {
  return selectByProbability(seed, TYPE_DISTRIBUTION)
}

function generateTransactionAmount(seed: number): number {
  const { MIN, MAX, PRECISION } = AMOUNT_CONFIG
  const randomValue = MIN + seededRandom(seed) * (MAX - MIN)
  return Math.round(randomValue * PRECISION) / PRECISION
}

function adjustAmountByType(amount: number, type: TransactionType): number {
  return type === 'refund' ? -amount : amount
}

function selectCustomerName(seed: number): string {
  return selectRandomItem(seed, CUSTOMER_NAMES)
}

function selectProductName(seed: number): string {
  return selectRandomItem(seed, PRODUCT_NAMES)
}

function createTransaction(params: {
  id: string
  customerName: string
  customerEmail: string
  amount: number
  status: TransactionStatus
  type: TransactionType
  date: string
  productName: string
}): Transaction {
  return {
    id: params.id,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    amount: params.amount,
    status: params.status,
    type: params.type,
    date: params.date,
    productName: params.productName,
  }
}

export function generateTransaction(index: number, endDate: Date): Transaction {
  const { TRANSACTIONS_PER_DAY, ID_PREFIX, ID_PADDING } = TRANSACTION_CONFIG

  const id = generateId(ID_PREFIX, index + 1, ID_PADDING)
  const date = generateTransactionDate(endDate, index, TRANSACTIONS_PER_DAY)
  const customerName = selectCustomerName(index + 2000)
  const productName = selectProductName(index + 3000)
  const status = selectTransactionStatus(index + 4000)
  const type = selectTransactionType(index + 5000)
  const amount = generateTransactionAmount(index + 6000)
  const adjustedAmount = adjustAmountByType(amount, type)
  const customerEmail = generateEmailFromName(customerName)

  return createTransaction({
    id,
    customerName,
    customerEmail,
    amount: adjustedAmount,
    status,
    type,
    date: date.toISOString(),
    productName,
  })
}

export function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
  return sortByDateDesc(transactions)
}
