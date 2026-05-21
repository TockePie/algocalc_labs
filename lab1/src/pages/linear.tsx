import GenericPage from '@/components/generic-page'
import { computeY1 } from '@/lib/linear-compute'
import type { Input } from '@/types/input'

function LinearPage() {
  return (
    <GenericPage
      title="Лінійний алгоритм"
      imageSrc="/linear-example.jpeg"
      inputs={inputs}
      computeFunction={computeY1}
    />
  )
}

const inputs: Input[] = [
  {
    name: 'a',
    type: 'number',
    placeholder: 'Число',
    labelName: 'Значення A:',
    valueAsNumber: true
  },
  {
    name: 'b',
    type: 'number',
    placeholder: 'Число',
    labelName: 'Значення B:',
    valueAsNumber: true
  },
  {
    name: 'x',
    type: 'number',
    placeholder: 'Число',
    labelName: 'Значення X:',
    valueAsNumber: true
  }
]

export default LinearPage
