import { SolutionType } from '../types/solution'

// const gaussElimination = (
//   aData: number[],
//   bData: number[]
// ): SolutionType | Error => {
//   const n = bData.length
//   const A: number[][] = []

//   // Формуємо матрицю A (розмір n x n)
//   for (let i = 0; i < n; i++) {
//     A.push(aData.slice(i * n, (i + 1) * n))
//   }

//   const B = [...bData] // копія, щоб не мутувати оригінал

//   // Прямий хід
//   for (let k = 0; k < n; k++) {
//     let maxRow = k
//     for (let i = k + 1; i < n; i++) {
//       if (Math.abs(A[i][k]) > Math.abs(A[maxRow][k])) {
//         maxRow = i
//       }
//     }

//     ;[A[k], A[maxRow]] = [A[maxRow], A[k]]
//     ;[B[k], B[maxRow]] = [B[maxRow], B[k]]

//     const pivot = A[k][k]
//     if (Math.abs(pivot) < 1e-12) {
//       return Error(
//         "Система має нескінченну кількість розв'язків або не має розв'язку"
//       )
//     }

//     for (let j = k; j < n; j++) {
//       A[k][j] /= pivot
//     }
//     B[k] /= pivot

//     for (let i = k + 1; i < n; i++) {
//       const factor = A[i][k]
//       for (let j = k; j < n; j++) {
//         A[i][j] -= factor * A[k][j]
//       }
//       B[i] -= factor * B[k]
//     }
//   }

//   // Зворотній хід
//   const x: number[] = Array(n).fill(0)
//   for (let i = n - 1; i >= 0; i--) {
//     x[i] = B[i]
//     for (let j = i + 1; j < n; j++) {
//       x[i] -= A[i][j] * x[j]
//     }
//   }

//   const result: SolutionType = {}
//   for (let i = 0; i < n; i++) {
//     result[`x${i + 1}`] = parseFloat(x[i].toFixed(6))
//   }

//   return result
// }

import {
  aFormFields,
  bFormFields
} from '../components/FormComp/common/form-fields' // Adjust path as needed

// Convert flat aFormFields into 2D matrix A (4x4)
function extractMatrix(fields, size = 4) {
  const values = fields.map((f) => parseFloat(f.defaultValue))
  const matrix = []
  for (let i = 0; i < size; i++) {
    matrix.push(values.slice(i * size, (i + 1) * size))
  }
  return matrix
}

// Convert bFormFields to 1D array
function extractVector(fields) {
  return fields.map((f) => parseFloat(f.defaultValue))
}

// Now extract actual data
const A = extractMatrix(aFormFields)
const b = extractVector(bFormFields)

// Use the Gaussian Elimination function from earlier
const result = gaussElimination(A, b)
console.log('Solution:', result)

function gaussElimination(A, b) {
  const n = b.length
  // Deep copy to avoid mutating original arrays
  A = A.map((row) => row.map((val) => parseFloat(val)))
  b = b.map((val) => parseFloat(val))

  // Create augmented matrix
  const M = A.map((row, i) => [...row, b[i]])

  for (let k = 0; k < n; k++) {
    // Find the row with the largest pivot
    let iMax = k
    let maxVal = Math.abs(M[k][k])
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(M[i][k]) > maxVal) {
        maxVal = Math.abs(M[i][k])
        iMax = i
      }
    }

    if (M[iMax][k] === 0) {
      throw new Error('унікального рішення не існує')
    }

    // Swap rows
    ;[M[k], M[iMax]] = [M[iMax], M[k]]

    // Eliminate
    for (let i = k + 1; i < n; i++) {
      const f = M[i][k] / M[k][k]
      for (let j = k + 1; j <= n; j++) {
        M[i][j] -= f * M[k][j]
      }
      M[i][k] = 0
    }
  }

  // Back substitution
  const x = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0
    for (let j = i + 1; j < n; j++) {
      sum += M[i][j] * x[j]
    }
    x[i] = (M[i][n] - sum) / M[i][i]
  }

  return x
}

export default gaussElimination
