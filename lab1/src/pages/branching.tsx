import GenericPage, { type Input } from '@/components/generic-page'
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
    valueAsNumber: true
  },
  {
    name: 'ci',
    type: 'number',
    placeholder: 'Число',
    labelName: 'Значення CI:',
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

export default BranchingPage
