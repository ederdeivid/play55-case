export function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function generateEmailFromName(name: string): string {
  const normalized = removeAccents(name.toLowerCase())
  const emailUser = normalized.replace(' ', '.')
  return `${emailUser}@email.com`
}

export function generateId(prefix: string, number: number, padding: number): string {
  return `${prefix}-${String(number).padStart(padding, '0')}`
}

export function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}

export function normalizeHash(hash: number): number {
  return (Math.abs(hash) % 1000) / 1000
}
