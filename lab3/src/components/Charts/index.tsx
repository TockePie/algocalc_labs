import { useEffect, useRef, useMemo } from 'react'
import Chart from 'chart.js/auto'

import { getRandomColor } from '@/utils/getRandomColor'
import { useChartContext } from '@/common/context/ChartContext'

export default function Charts() {
  const { chartsVisible, chartData } = useChartContext()

  const chartRef1 = useRef<HTMLCanvasElement>(null)
  const chartRef2 = useRef<HTMLCanvasElement>(null)
  const chartRef3 = useRef<HTMLCanvasElement>(null)
  const chartInstances = useRef<Chart[]>([])

  const chartConfigs = useMemo(
    () =>
      [
        { ref: chartRef1, label: '1/(1+e^-x)', dataKey: 'y' },
        { ref: chartRef2, label: 'Інтерполяція', dataKey: 'yPoli' },
        { ref: chartRef3, label: 'Похибка', dataKey: 'delta' }
      ] as const,
    []
  )

  const processedLabels = useMemo(() => {
    if (!chartData) return null
    return chartData.xValue.map((x: number) => Number(x.toFixed(2)))
  }, [chartData])

  useEffect(() => {
    return () => {
      for (const chart of chartInstances.current) chart.destroy()
      chartInstances.current = []
    }
  }, [])

  useEffect(() => {
    if (!chartData || !chartsVisible || !processedLabels) return

    for (const chart of chartInstances.current) chart.destroy()
    chartInstances.current = []

    const allRefsAvailable = chartConfigs.every(
      (config) => config.ref.current && config.ref.current.getContext('2d')
    )

    if (!allRefsAvailable) return

    const { xValue } = chartData
    const labels = xValue.map((x: number) => Number(x.toFixed(2)))

    for (const { ref, label, dataKey } of chartConfigs) {
      const ctx = ref.current!.getContext('2d')!

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label,
              data: chartData[dataKey],
              borderColor: getRandomColor(),
              borderWidth: 2,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })

      chartInstances.current.push(chart)
    }
  }, [chartData, chartsVisible, chartConfigs, processedLabels])

  if (!chartsVisible || !chartData) return null

  return (
    <>
      <div className="flex h-[50vh] gap-10 px-5">
        {chartConfigs.map(({ ref }, index) => (
          <div className="w-full max-w-1/3" key={index}>
            <canvas ref={ref} id={`diagram${index > 0 ? index + 1 : ''}`} />
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto px-5">
        <h3 className="mb-3 text-xl font-semibold">Таблиця результатів</h3>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {['x', 'Exp(cos(x))', 'Інтерполяція', 'Похибка'].map((title) => (
                <th className="border border-gray-300 p-2">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chartData.xValue.map((x: number, index: number) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="border border-gray-300 p-2">{x.toFixed(4)}</td>
                <td className="border border-gray-300 p-2">
                  {chartData.y[index].toFixed(8)}
                </td>
                <td className="border border-gray-300 p-2">
                  {chartData.yPoli[index].toFixed(8)}
                </td>
                <td className="border border-gray-300 p-2">
                  {chartData.delta[index].toFixed(8)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
