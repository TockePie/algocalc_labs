function generateArray(numElements: number): number[] {
  if (!isNaN(numElements) && numElements > 0) {
    const array = Array.from({ length: numElements }, () =>
      Math.floor(Math.random() * 100)
    )
    return array
  }
  return []
}

export default generateArray
