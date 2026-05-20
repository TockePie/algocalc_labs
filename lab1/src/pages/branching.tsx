import GenericPage, { type Input } from '@/components/main-page/main-template'
import computeY from '@/lib/branching-compute'

function BranchingPage() {
  return (
    <GenericPage
      title="Розгалуджувальний алгоритм"
      imageSrc="/branching-example.jpeg"
      inputs={inputs}
      computeFunction={computeY}
    />
  )
}

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

export default BranchingPage
