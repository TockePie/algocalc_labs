import { lusolve } from 'mathjs'

import convertToMatrix from '@/utils/convert-to-matrix'

export default function gaussElimination(aData: number[], bData: number[]) {
  const matrixA = convertToMatrix(aData)

  const solution = lusolve(matrixA, bData) as number[][]

  return {
    x1: solution[0][0],
    x2: solution[1][0],
    x3: solution[2][0],
    x4: solution[3][0]
  }
}
