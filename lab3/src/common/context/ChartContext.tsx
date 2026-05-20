import type { ChartData } from '@/types/chart-data'
import { createContext, useContext, useState } from 'react'

interface ChartContextProps {
  chartsVisible: boolean
  setChartsVisible: React.Dispatch<React.SetStateAction<boolean>>
  chartData: ChartData | null
  setChartData: React.Dispatch<React.SetStateAction<ChartData | null>>
}

const ChartContext = createContext<ChartContextProps | undefined>(undefined)

export default function ChartProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [chartsVisible, setChartsVisible] = useState(false)
  const [chartData, setChartData] = useState<ChartData | null>(null)

  return (
    <ChartContext.Provider
      value={{
        chartsVisible,
        setChartsVisible,
        chartData,
        setChartData
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}

function useChartContext() {
  const context = useContext(ChartContext)
  if (context === undefined) {
    throw new Error('useChartContext must be used within a ChartProvider')
  }
  return context
}

export { ChartContext, useChartContext }
