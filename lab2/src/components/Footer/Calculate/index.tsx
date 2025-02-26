import { useElementsContext } from '@/common/elementsContext'
import { Button } from '@/components/ui/button'
import { selectionSort } from '@/lib/algorithm'

export default function Calculate() {
  const { initArray, setResultArray, setExecutionTime } = useElementsContext()

  const handleGenerate = () => {
    const array = initArray.split(',').map(Number)
    const startTime = performance.now()
    const result = selectionSort(array)
    const endTime = performance.now()
    setResultArray(result.join(', '))
    setExecutionTime(endTime - startTime)
  }

  return (
    <Button variant="default" onClick={handleGenerate}>
      Обчислити
    </Button>
  )
}
