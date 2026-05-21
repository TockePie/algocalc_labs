export default function selectionSort(arr: number[]): {
  sortedArray: number[]
  comparisons: number
  swaps: number
} {
  let comparisons = 0
  let swaps = 0
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      comparisons++
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    if (minIndex !== i) {
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
      swaps++
    }
  }

  return { sortedArray: arr, comparisons, swaps }
}
