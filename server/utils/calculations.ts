export function calculateLinearGrowth(
  baseValue: number,
  growthRate: number,
  totalPeriods: number,
  currentPeriod: number
): number {
  return baseValue * (1 + growthRate * (currentPeriod / totalPeriods))
}

export function calculateVolatilityVariation(
  normalizedValue: number,
  volatility: number
): number {
  return 1 + (normalizedValue - 0.5) * volatility
}

export function multiplyFactors(...factors: number[]): number {
  return factors.reduce((acc, factor) => acc * factor, 1)
}

export function roundToInteger(value: number): number {
  return Math.round(value)
}
