import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type TooltipItem
} from 'chart.js'

import { useChartContext } from '@/common/chart-context'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Charts = () => {
  const { chartsVisible, chartData } = useChartContext()

  if (!chartsVisible || !chartData) return null

  const points = chartData.points || []
  const formattedPoints = chartData.points.map((point) => ({
    x: point.x,
    y: point.y
  }))

  const xValues = points.map((p) => p.x)
  const zeroLineData = points.length
    ? [
        { x: Math.min(...xValues), y: 0 },
        { x: Math.max(...xValues), y: 0 }
      ]
    : []

  const data = {
    datasets: [
      {
        label: 'Y = 0',
        data: zeroLineData,
        borderColor: '#94a3b8',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0
      },
      {
        label: 'Function',
        data: formattedPoints,
        borderColor: '#220cca',
        borderWidth: 2,
        tension: 0.1,
        pointRadius: 0
      },
      {
        label: 'Root',
        data: chartData?.root ? [chartData.root] : [],
        backgroundColor: '#ef4444', // red
        borderColor: '#ef4444',
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom',
        title: {
          display: true,
          text: 'X'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Y'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const point = context.raw as { x: number; y: number }
            if (point.y === 0) {
              return `Root: (${point.x.toFixed(4)}, ${point.y})`
            }
            return `(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`
          }
        }
      }
    }
  } as const

  return (
    <div className="flex h-[50vh] px-5">
      <div className="mx-auto w-196">
        <h3 className="mb-2 text-center font-medium text-neutral-400">
          Результат: {chartData.root?.x}
        </h3>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default Charts
