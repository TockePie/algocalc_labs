import Matrix, { solve } from 'ml-matrix'

import convertToMatrix from '@/utils/convert-to-matrix'

export default function gaussElimination(aData: number[], bData: number[]) {
  const matrixA = new Matrix(convertToMatrix(aData))
  const vectorB = Matrix.columnVector(bData)

  const solution = solve(matrixA, vectorB)

  return {
    x1: solution.get(0, 0),
    x2: solution.get(1, 0),
    x3: solution.get(2, 0),
    x4: solution.get(3, 0)
  }
}
