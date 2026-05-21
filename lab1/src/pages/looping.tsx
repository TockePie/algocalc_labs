import GenericPage from '@/components/generic-page'
import calculateF from '@/lib/looping-compute'
import type { Input } from '@/types/input'

interface InputProps {
  a: string
  b: string
  n: number
}

function LoopingPage() {
  const computeFunction = (data: InputProps) => {
    const mappedObj = {
      n: data.n,
      a: data.a.split(',').map(Number),
      b: data.b.split(',').map(Number)
    }

    return calculateF(mappedObj)
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
