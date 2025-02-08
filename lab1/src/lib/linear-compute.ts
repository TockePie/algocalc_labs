const computeY1 = ({
  a,
  b,
  x
}: {
  a: number
  b: number
  x: number
}):
  | number
  | {
      type: 'info' | 'error'
      title: string
      message: string
    } => {
  if (x === 0) {
    return {
      type: 'error',
      title: 'Помилка',
      message: 'x не може дорівнювати 0'
    }
  }
  return Math.pow(a + b / x, 3) + Math.pow(b + a / x, 5)
}

console.log(computeY1({ a: 1, b: 2, x: 1 }))

export { computeY1 }
