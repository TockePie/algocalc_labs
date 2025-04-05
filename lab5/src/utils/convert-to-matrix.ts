const convertToMatrix = (flatArray: number[], columnsPerRow = 4) => {
  const matrix = []

  for (let i = 0; i < flatArray.length; i += columnsPerRow) {
    matrix.push(flatArray.slice(i, i + columnsPerRow))
  }

  return matrix
}

export default convertToMatrix
