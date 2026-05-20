import GenericPage, { type Input } from '@/components/main-page/main-template'
import computeY from '@/lib/branching-compute'

function BranchingPage() {
  const inputs: Input[] = [
    {
      name: 'i',
      type: 'number',
      placeholder: 'Число',
      labelName: 'Значення I:',
      required: true,
      valueAsNumber: true
    },
    {
      name: 'ci',
      type: 'number',
      placeholder: 'Число',
      labelName: 'Значення CI:',
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
      title="Розгалуджувальний алгоритм"
      imageSrc="../../public/branching-example.jpeg"
      inputs={inputs}
      computeFunction={computeY}
      filePickerAccept=".json"
    />
  )
}

export default BranchingPage
