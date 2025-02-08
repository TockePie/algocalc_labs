const calculateF = ({
  n,
  a,
  b
}: {
  n: number
  a: number[]
  b: number[]
}):
  | number
  | {
      type: 'info' | 'error'
      title: string
      message: string
    } => {
  if (n <= 0) {
    return {
      type: 'error',
      title: 'Помилка',
      message: 'n має бути більше 0'
    }
  }
  if (a.length !== n || b.length !== n) {
    return {
      type: 'error',
      title: 'Помилка',
      message: 'Довжина масивів a та b має бути рівною n'
    }
  }

  let product = 1
  let summation = 0

  for (let i = 0; i < n; i++) {
    const aCubed = Math.pow(a[i], 3)
    const bCubed = Math.pow(b[i], 3)
    product *= aCubed - bCubed
    summation += aCubed + bCubed
  }

  return product + summation
}

export default calculateF
