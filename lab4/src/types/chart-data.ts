export interface ChartData {
  points: {
    x: number
    y: number
  }[]
  root: {
    x: number
    y: number
  } | null
  function: string
}
