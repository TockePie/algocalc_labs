const computeY1 = ({ a, b, x }: { a: number; b: number; x: number }) => {
  if (x === 0) {
    return {
      type: 'error',
      title: 'Помилка',
      message: 'x не може дорівнювати 0'
    } as const
  }

  return Math.pow(a + b / x, 3) + Math.pow(b + a / x, 5)
}

export { computeY1 }
