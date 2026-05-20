import GenericPage, { type Input } from '@/components/main-page/main-template'
import { computeY1 } from '@/lib/linear-compute'

function LinearPage() {
  const inputs: Input[] = [
    {
      name: 'a',
      type: 'number',
      placeholder: 'Число',
      labelName: 'Значення A:',
      required: true,
      valueAsNumber: true
    },
    {
      name: 'b',
      type: 'number',
      placeholder: 'Число',
      labelName: 'Значення B:',
      required: true,
      valueAsNumber: true
    },
    {
      name: 'x',
      type: 'number',
      placeholder: 'Число',
      labelName: 'Значення X:',
      required: true,
      valueAsNumber: true
    }
  ]

  return (
    <GenericPage
      title="Лінійний алгоритм"
      imageSrc="../../public/linear-example.jpeg"
      inputs={inputs}
      computeFunction={computeY1}
      filePickerAccept=".json"
    />
  )
}

export default LinearPage
