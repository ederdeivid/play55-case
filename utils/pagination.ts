export function calculatePageRange(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  
  const half = Math.floor(maxVisible / 2)
  let start = currentPage - half
  let end = currentPage + half
  
  if (start < 1) {
    start = 1
    end = maxVisible
  }
  
  if (end > totalPages) {
    end = totalPages
    start = totalPages - maxVisible + 1
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function paginateItems<T>(
  items: T[],
  currentPage: number,
  pageSize: number
): {
  items: T[]
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
} {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  
  return {
    items: items.slice(startIndex, endIndex),
    currentPage,
    pageSize,
    totalItems,
    totalPages,
  }
}
