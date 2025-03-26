import { useContext } from 'react'

import { ChartContext } from '../context/chart-context'

const useChartContext = () => {
  const context = useContext(ChartContext)

  if (context === undefined) {
    throw new Error('useChartContext must be used within a ChartProvider')
  }
  return context
}

export default useChartContext
