import type { TimeSeriesDataPoint } from '../../../layers/dashboard/types'
import { hashCode, normalizeHash } from '../../utils/string'
import { getDayOfWeek, isWeekend, isMidWeek } from '../../utils/date'
import {
  calculateLinearGrowth,
  calculateVolatilityVariation,
  multiplyFactors,
  roundToInteger,
} from '../../utils/calculations'
import { TIME_SERIES_CONFIG } from './constants'

function calculateRandomVariation(
  dateString: string,
  volatility: number
): number {
  const hash = hashCode(dateString)
  const normalized = normalizeHash(hash)
  return calculateVolatilityVariation(normalized, volatility)
}

function calculateWeekdayFactor(dayOfWeek: number): number {
  const weekendFactor = isWeekend(dayOfWeek) ? TIME_SERIES_CONFIG.WEEKEND_FACTOR : 1.0
  const weekdayBoost = isMidWeek(dayOfWeek) ? TIME_SERIES_CONFIG.WEEKDAY_BOOST_FACTOR : 1.0

  return multiplyFactors(weekendFactor, weekdayBoost)
}

function createDataPoint(date: Date, value: number): TimeSeriesDataPoint {
  const dateString = date.toISOString().split('T')[0]
  return { date: dateString, value }
}

function generateDateForIndex(endDate: Date, daysBack: number): Date {
  const date = new Date(endDate)
  date.setDate(date.getDate() - daysBack)
  return date
}

export function generateSingleDataPoint(
  endDate: Date,
  totalDays: number,
  currentIndex: number
): TimeSeriesDataPoint {
  const { BASE_VALUE, GROWTH_RATE, VOLATILITY } = TIME_SERIES_CONFIG

  const daysBack = totalDays - 1 - currentIndex
  const date = generateDateForIndex(endDate, daysBack)
  const dateString = date.toISOString().split('T')[0]

  const trend = calculateLinearGrowth(BASE_VALUE, GROWTH_RATE, totalDays, currentIndex + 1)
  const randomVariation = calculateRandomVariation(dateString, VOLATILITY)
  const dayOfWeek = getDayOfWeek(date)
  const weekdayFactor = calculateWeekdayFactor(dayOfWeek)

  const value = roundToInteger(multiplyFactors(trend, randomVariation, weekdayFactor))

  return createDataPoint(date, value)
}
