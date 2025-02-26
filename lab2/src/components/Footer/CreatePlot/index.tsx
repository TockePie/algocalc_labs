import { useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import generateArray from '@/utils/generate-array'
import { measureStats } from '@/utils/measure-stats'

Chart.register(...registerables)

export default function CreatePlot() {
  const chartTimeRef = useRef<Chart<'line'> | null>(null)
  const [data, setData] = useState<number[][]>([])
  const chartOpsRef = useRef<Chart<'line'> | null>(null)
  const [operationsData, setOperationsData] = useState<number[][]>([])

  const handleGeneratePlot = () => {
    const sizes = [10, 50, 100, 500, 1000, 5000]

    const results = sizes.map((size) => {
      const array = generateArray(size)
      return measureStats(array)
    })

    setData(sizes.map((size, i) => [size, results[i].time]))
    setOperationsData(sizes.map((size, i) => [size, results[i].operations]))
  }

  const handleExport = () => {
    if (!chartTimeRef.current || !chartOpsRef.current) return

    const canvas1 = chartTimeRef.current.canvas.toDataURL('image/png')
    const canvas2 = chartOpsRef.current.canvas.toDataURL('image/png')

    window.api!.saveImage(canvas1)
    window.api!.saveImage(canvas2)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" onClick={handleGeneratePlot}>
          Побудувати графік
        </Button>
      </DialogTrigger>

      <DialogContent className="h-auto w-auto">
        <DialogTitle>Графіки виконання алгоритму</DialogTitle>

        <ScrollArea className="h-56 w-115">
          <DialogDescription className="h-56 w-115">
            {data.length > 0 && (
              <>
                <Line
                  ref={chartTimeRef}
                  data={{
                    labels: data.map(([size]) => size),
                    datasets: [
                      {
                        label: 'Час виконання (розмір масиву/мс)',
                        data: data.map(([, time]) => time),
                        borderColor: 'blue',
                        borderWidth: 2
                      }
                    ]
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />

                <Line
                  ref={chartOpsRef}
                  data={{
                    labels: operationsData.map(([size]) => size),
                    datasets: [
                      {
                        label: 'Кількість операцій (розмір масиву/операції)',
                        data: operationsData.map(([, ops]) => ops),
                        borderColor: 'red',
                        borderWidth: 2
                      }
                    ]
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </>
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
