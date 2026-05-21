import selectionSort from '@/lib/algorithm'

export default function measureStats(arr: number[]) {
  const copy = [...arr]

  const startTime = performance.now()
  const { comparisons, swaps } = selectionSort(copy)
  const time = performance.now() - startTime

  return { time, operations: comparisons + swaps }
}
