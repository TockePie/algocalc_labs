import { useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Button } from '@ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@ui/dialog'
import { ScrollArea } from '@ui/scroll-area'
import { Chart, registerables } from 'chart.js'

import generateArray from '@/utils/generate-array'
import measureStats from '@/utils/measure-stats'

type StatResult = {
  size: number
  time: number
  operations: number
}

Chart.register(...registerables)

export default function CreatePlot() {
  const chartTimeRef = useRef<Chart<'line'> | null>(null)
  const chartOpsRef = useRef<Chart<'line'> | null>(null)
  const [stats, setStats] = useState<StatResult[]>([])

  const handleGeneratePlot = () => {
    const sizes = [10, 50, 100, 500, 1000, 5000]

    const results = sizes.map((size) => {
      const array = generateArray(size)
      const { time, operations } = measureStats(array)
      return { size, time, operations }
    })

    setStats(results)
  }

  const handleExport = () => {
    const exports = [
      { ref: chartTimeRef, name: 'execution-time-chart.png' },
      { ref: chartOpsRef, name: 'operations-count-chart.png' }
    ]

    exports.forEach(({ ref, name }) => {
      const canvas = ref.current?.canvas
      if (!canvas) return

      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = name
      link.click()
    })
  }

  const labels = stats.map((s) => s.size)
  const chartOptions = { responsive: true, maintainAspectRatio: false }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" onClick={handleGeneratePlot}>
          Побудувати графік
        </Button>
      </DialogTrigger>

      <DialogContent className="h-auto w-auto">
        <DialogTitle>Графіки виконання алгоритму</DialogTitle>

        <ScrollArea className="h-70 w-115">
          <DialogDescription className="h-70 w-115">
            {stats.length > 0 && (
              <div className="space-y-4 p-1">
                <div className="h-64">
                  <Line
                    ref={chartTimeRef}
                    options={chartOptions}
                    data={{
                      labels,
                      datasets: [
                        {
                          label: 'Час виконання (розмір масиву/мс)',
                          data: stats.map((s) => s.time),
                          borderColor: 'blue',
                          borderWidth: 2
                        }
                      ]
                    }}
                  />
                </div>

                <div className="h-64">
                  <Line
                    ref={chartOpsRef}
                    options={chartOptions}
                    data={{
                      labels,
                      datasets: [
                        {
                          label: 'Кількість операцій (розмір масиву/операції)',
                          data: stats.map((s) => s.operations),
                          borderColor: 'red',
                          borderWidth: 2
                        }
                      ]
                    }}
                  />
                </div>
              </div>
            )}
          </DialogDescription>
        </ScrollArea>

        <DialogFooter className="items-end">
          <Button variant="outline" onClick={handleExport}>
            Експортувати графіки
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
