export function generateDateWithOffset(
  baseDate: Date,
  daysOffset: number,
  hoursSeed: number,
  minutesSeed: number
): Date {
  const date = new Date(baseDate)
  date.setDate(date.getDate() - daysOffset)
  date.setHours(Math.floor(hoursSeed * 24))
  date.setMinutes(Math.floor(minutesSeed * 60))
  return date
}

export function generateRandomDate(
  endDate: Date,
  daysBack: number,
): Date {
  const date = new Date(endDate)
  date.setDate(date.getDate() - daysBack)
  return date
}

export function toISOString(date: Date): string {
  return date.toISOString()
}

export function getDayOfWeek(date: Date): number {
  return date.getDay()
}

export function isWeekend(dayOfWeek: number): boolean {
  return dayOfWeek === 0 || dayOfWeek === 6
}

export function isMidWeek(dayOfWeek: number): boolean {
  return dayOfWeek === 3 || dayOfWeek === 4
}
