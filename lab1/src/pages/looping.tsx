import GenericPage, { Input } from '@/components/main-page/main-template'
import calculateF from '@/lib/looping-compute'

interface InputProps {
  a: number[]
  b: number[]
  n: number
}

function LoopingPage() {
  const inputs: Input[] = [
    {
      name: 'n',
      type: 'number',
      placeholder: 'Число',
      labelName: 'Значення N:',
      required: true,
      valueAsNumber: true
    },
    {
      name: 'a',
      type: 'string',
      placeholder: 'Масив чисел',
      labelName: 'Значення A:',
      required: true
    },
    {
      name: 'b',
      type: 'string',
      placeholder: 'Масив чисел',
      labelName: 'Значення B:',
      required: true
    }
  ]

  const computeFunction = (data: InputProps) => {
    data.a = data.a.split(',').map(Number)
    data.b = data.b.split(',').map(Number)
    // implement the looping compute function
    return calculateF(data)
  }

  return (
    <GenericPage
      title="Циклічний алгоритм"
      imageSrc="../../public/looping-example.jpeg"
      inputs={inputs}
      computeFunction={computeFunction}
      filePickerAccept=".json"
    />
  )
}

export default LoopingPage
