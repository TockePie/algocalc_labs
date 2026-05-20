import GenericPage, { type Input } from '@/components/generic-page'
import calculateF from '@/lib/looping-compute'

interface InputProps {
  a: number[]
  b: number[]
  n: number
}

function LoopingPage() {
  const computeFunction = (data: InputProps) => {
    data.a = data.a.split(',').map(Number)
    data.b = data.b.split(',').map(Number)

    return calculateF(data)
  }

  return (
    <GenericPage
      title="Циклічний алгоритм"
      imageSrc="/looping-example.jpeg"
      inputs={inputs}
      computeFunction={computeFunction}
    />
  )
}

const inputs: Input[] = [
  {
    name: 'n',
    type: 'number',
    placeholder: 'Число',
    labelName: 'Значення N:',
    valueAsNumber: true
  },
  {
    name: 'a',
    type: 'string',
    placeholder: 'Масив чисел',
    labelName: 'Значення A:'
  },
  {
    name: 'b',
    type: 'string',
    placeholder: 'Масив чисел',
    labelName: 'Значення B:'
  }
]

export default LoopingPage
