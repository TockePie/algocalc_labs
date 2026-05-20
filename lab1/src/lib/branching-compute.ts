const computeY = ({ i, ci, x }: { i: number; ci: number; x: number }) => {
  if (x === 0) {
    return {
      type: 'error',
      title: 'Помилка',
      message: 'x не може дорівнювати 0'
    } as const
  }

  if (i % 2 === 1) {
    // i = 2n + 1 (непарне)
    return (
      25 * ci ** 2 -
      Math.sqrt((2 * i) / (34 * x ** 2)) +
      4 * Math.sqrt(i / (45 * x ** 2))
    )
  } else {
    // i = 2n (парне)
    return (
      25 * x ** 2 -
      Math.sqrt((2 * i) / (34 * ci ** 2)) +
      4 * Math.sqrt(i / (45 * ci ** 2))
    )
  }
}

export default computeY
