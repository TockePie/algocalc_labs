import { func } from '../lib/algorithm'

const generateChartData = (a: number, b: number, root: number | null) => {
  const numPoints = 100
  const step = (b - a) / numPoints
  const points = []

  for (let i = 0; i <= numPoints; i++) {
    const x = a + i * step
    points.push({ x, y: func(x) })
  }

  return {
    points,
    root: root ? { x: root, y: 0 } : null,
    function: 'x³ + 10x - 9 = 0'
  }
}

export default generateChartData
