import { Button } from '../../ui/button'

import useChartContext from '../../../common/hooks/use-chart-context'

const Buttons = () => {
  const { chartsVisible, setChartsVisible, setChartData } = useChartContext()

  const handleClear = () => {
    setChartsVisible(false)
    setChartData(null)
  }

  return (
    <div className="flex gap-4">
      <Button type="submit">Обчислити</Button>
      {chartsVisible && (
        <Button type="button" variant="secondary" onClick={handleClear}>
          Очистити
        </Button>
      )}
    </div>
  )
}

export default Buttons
