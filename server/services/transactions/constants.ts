import type { TransactionStatus, TransactionType } from '../../../layers/dashboard/types'

export const CUSTOMER_NAMES = [
  'Maria Silva', 'João Santos', 'Ana Oliveira', 'Pedro Costa',
  'Carla Souza', 'Lucas Ferreira', 'Julia Lima', 'Rafael Pereira',
  'Fernanda Rodrigues', 'Gabriel Almeida', 'Beatriz Nascimento',
  'Thiago Barbosa', 'Larissa Ribeiro', 'Bruno Martins', 'Amanda Gomes',
] as const

export const PRODUCT_NAMES = [
  'Plano Pro Mensal', 'Plano Enterprise', 'Plano Starter',
  'Add-on Analytics', 'Add-on API', 'Consultoria Premium',
  'Treinamento Equipe', 'Suporte Prioritário',
] as const

export const STATUS_DISTRIBUTION: Array<{ value: TransactionStatus; probability: number }> = [
  { value: 'completed', probability: 0.7 },
  { value: 'pending', probability: 0.15 },
  { value: 'failed', probability: 0.10 },
  { value: 'refunded', probability: 0.05 },
]

export const TYPE_DISTRIBUTION: Array<{ value: TransactionType; probability: number }> = [
  { value: 'subscription', probability: 0.5 },
  { value: 'purchase', probability: 0.3 },
  { value: 'upgrade', probability: 0.15 },
  { value: 'refund', probability: 0.05 },
]

export const AMOUNT_CONFIG = {
  MIN: 50,
  MAX: 500,
  PRECISION: 100,
} as const

export const TRANSACTION_CONFIG = {
  TRANSACTIONS_PER_DAY: 3,
  ID_PREFIX: 'txn',
  ID_PADDING: 6,
} as const
