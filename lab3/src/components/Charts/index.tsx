import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

import { useChartContext } from '@/common/context/ChartContext'

export default function Charts() {
  const { chartsVisible, chartData } = useChartContext()

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const chartInstances = useRef<Chart[]>([])

  const chartConfigs = [
    { label: 'Exp(cos(x))', dataKey: 'y', color: 'rgb(54, 162, 235)' },
    { label: 'Інтерполяція', dataKey: 'yPoli', color: 'rgb(255, 99, 132)' },
    { label: 'Похибка', dataKey: 'delta', color: 'rgb(75, 192, 192)' }
  ] as const

  useEffect(() => {
    if (!chartsVisible || !chartData) {
      chartInstances.current.forEach((chart) => chart.destroy())
      chartInstances.current = []
      return
    }

    chartInstances.current.forEach((chart) => chart.destroy())
    chartInstances.current = []

    const labels = chartData.xValue.map((x: number) => Number(x.toFixed(2)))

    chartConfigs.forEach((config, index) => {
      const canvas = canvasRefs.current[index]
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: config.label,
              data: chartData[config.dataKey],
              borderColor: config.color,
              borderWidth: 2,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } }
        }
      })

      chartInstances.current.push(chart)
    })

    return () => {
      chartInstances.current.forEach((chart) => chart.destroy())
      chartInstances.current = []
    }
  }, [chartData, chartsVisible])

  if (!chartsVisible || !chartData) return null

  return (
    <div className="flex h-[50vh] gap-10 px-5">
      {chartConfigs.map((_, index) => (
        <div className="w-full max-w-1/3" key={index}>
          <canvas
            ref={(el) => {
              canvasRefs.current[index] = el
            }}
            id={`diagram${index > 0 ? index + 1 : ''}`}
          />
        </div>
      ))}
    </div>
  )
}
