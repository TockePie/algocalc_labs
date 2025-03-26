import { createContext, ReactNode, SetStateAction, useState } from 'react'

import { ChartData } from '../../types/chart-data'

interface ChartContextProps {
  chartsVisible: boolean
  setChartsVisible: React.Dispatch<SetStateAction<boolean>>
  chartData: ChartData | null
  setChartData: React.Dispatch<SetStateAction<ChartData | null>>
}

const ChartContext = createContext<ChartContextProps | undefined>(undefined)

const ChartProvider = ({ children }: { children: ReactNode }) => {
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

export { ChartContext }
export default ChartProvider
