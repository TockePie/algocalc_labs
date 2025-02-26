import { selectionSortWithStats } from '@/lib/selection-sort-stars'

function measureStats(arr: number[]) {
  const copy = [...arr]

  const startTime = performance.now()
  const { comparisons, swaps } = selectionSortWithStats(copy)
  const time = performance.now() - startTime

  return { time, operations: comparisons + swaps }
}

export { measureStats }
