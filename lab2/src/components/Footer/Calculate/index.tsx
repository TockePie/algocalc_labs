import { useElementsContext } from '@/common/elementsContext'
import { Button } from '@/components/ui/button'
import { selectionSort } from '@/lib/algorithm'

export default function Calculate() {
  const { initArray, setResultArray } = useElementsContext()

  const handleGenerate = () => {
    const result = selectionSort(initArray.split(',').map(Number))
    setResultArray(result.join(', '))
  }

  return (
    <Button variant="default" onClick={handleGenerate}>
      Обчислити
    </Button>
  )
}
