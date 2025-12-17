export const TIME_SERIES_CONFIG = {
  BASE_VALUE: 10000,
  GROWTH_RATE: 0.02,
  VOLATILITY: 0.15,
  WEEKEND_FACTOR: 0.8,
  WEEKDAY_BOOST_FACTOR: 1.1,
} as const

export const WEEKEND_DAYS = [0, 6] as const

export const MID_WEEK_DAYS = [3, 4] as const
