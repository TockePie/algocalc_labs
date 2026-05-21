function func(x: number): number {
  return Math.pow(x, 3) + 10 * x - 9
}

function dfunc(x: number): number {
  return 3 * Math.pow(x, 2) + 10
}

interface NewtonMethodProps {
  x0: number
  eps: number
  maxIter?: number
}

const newtonMethod = ({
  x0,
  eps,
  maxIter = 1000
}: NewtonMethodProps): number | null => {
  let xPrev = x0

  for (let i = 0; i < maxIter; i++) {
    const xNext = xPrev - func(xPrev) / dfunc(xPrev)

    if (Math.abs(xNext - xPrev) < eps) return xNext

    xPrev = xNext
  }

  return null
}

export { dfunc, func }
export default newtonMethod
