export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export function selectRandomIndex(seed: number, arrayLength: number): number {
  return Math.floor(seededRandom(seed) * arrayLength)
}

export function selectRandomItem<T>(seed: number, items: readonly T[]): T {
  const index = selectRandomIndex(seed, items.length)
  return items[index]
}

export function selectByProbability<T>(
  seed: number,
  options: Array<{ value: T; probability: number }>
): T {
  const random = seededRandom(seed)
  let accumulated = 0

  for (const option of options) {
    accumulated += option.probability
    if (random < accumulated) {
      return option.value
    }
  }

  return options[options.length - 1].value
}
