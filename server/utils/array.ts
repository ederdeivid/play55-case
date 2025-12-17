export function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return items.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function sortByDateAsc<T extends { date: string }>(items: T[]): T[] {
  return items.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )
}

export function generateArray<T>(
  length: number,
  generator: (index: number) => T
): T[] {
  return Array.from({ length }, (_, i) => generator(i))
}
