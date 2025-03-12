const calculateAiken = (a: number, b: number, n: number) => {
  if (
    isNaN(a) ||
    isNaN(b) ||
    isNaN(n) ||
    a >= b ||
    n < 2 ||
    n > 1000 ||
    a < -100 ||
    b > 100 ||
    a > 100 ||
    b < -100
  ) {
    alert('Введіть коректні дані')
    return null
  }

  const h = (b - a) / (n - 1)
  const xValue = Array.from({ length: n }, (_, i) => a + i * h)
  const y = xValue.map((x) => 1 / (1 + Math.exp(-x)))

  const getInterpolatedValue = (x: number) => {
    const buffer = [...y]
    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        buffer[j] =
          ((x - xValue[i]) * buffer[j] - (x - xValue[j]) * buffer[i]) /
          (xValue[j] - xValue[i])
      }
    }
    return buffer[n - 1]
  }

  const yPoli = xValue.map((x) => getInterpolatedValue(x))
  const delta = xValue.map((x) =>
    Math.abs(Math.exp(Math.cos(x)) - getInterpolatedValue(x))
  )

  return { xValue, y, yPoli, delta }
}

export { calculateAiken }
