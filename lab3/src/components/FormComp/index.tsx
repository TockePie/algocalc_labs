import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { calculateAiken } from '@/lib/aiken'
import { useChartContext } from '@/common/context/ChartContext'

import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function FormComp() {
  const { chartsVisible, setChartsVisible, setChartData } = useChartContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const { register, handleSubmit, setValue } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      a: searchParams.get('a') ? Number(searchParams.get('a')) : 0,
      b: searchParams.get('b') ? Number(searchParams.get('b')) : 4,
      n: searchParams.get('n') ? Number(searchParams.get('n')) : 10
    }
  })

  useEffect(() => {
    const a = searchParams.get('a')
    const b = searchParams.get('b')
    const n = searchParams.get('n')

    if (a) setValue('a', Number(a))
    if (b) setValue('b', Number(b))
    if (n) setValue('n', Number(n))
  }, [searchParams, setValue])

  const onSubmit = async (data: { a: number; b: number; n: number }) => {
    setSearchParams({
      a: String(data.a),
      b: String(data.b),
      n: String(data.n)
    })

    const result = calculateAiken(data.a, data.b, data.n)
    if (result) {
      setChartData(result)
      setChartsVisible(true)
    }
  }

  const handleClear = () => {
    setChartsVisible(false)
    setChartData(null)
  }

  const formFields = [
    { name: 'a', placeholder: 'Значення A' },
    { name: 'b', placeholder: 'Значення B' },
    { name: 'n', placeholder: 'Значення N' }
  ]

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-5"
    >
      <div className="flex gap-5">
        {formFields.map(({ name, placeholder }) => (
          <div className="flex flex-col gap-1 font-semibold" key={name}>
            <Label htmlFor={name}>{placeholder}</Label>
            <Input
              {...register(name as 'a' | 'b' | 'n', { valueAsNumber: true })}
              type="number"
              placeholder="Число"
              key={name}
              id={`input${name.toUpperCase()}`}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button type="submit">Обчислити</Button>
        {chartsVisible && (
          <Button type="button" variant="secondary" onClick={handleClear}>
            Очистити
          </Button>
        )}
      </div>
    </form>
  )
}
