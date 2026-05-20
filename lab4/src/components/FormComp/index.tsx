import { useEffect } from 'react'
import { useForm, type UseFormGetValues } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { useChartContext } from '@/common/chart-context'
import newtonMethod from '@/lib/algorithm'
import generateChartData from '@/utils/generate-chart-data'

const formFields = [
  { name: 'a', placeholder: 'Ліва межа' },
  { name: 'b', placeholder: 'Права межа' },
  { name: 'e', placeholder: 'Точність (1e^-[число])' }
]

const FormComp = () => {
  const { chartsVisible, setChartsVisible, setChartData } = useChartContext()
  const { register, handleSubmit, setValue } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: { a: 0, b: 4, e: 6 }
  })
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const a = searchParams.get('a')
    const b = searchParams.get('b')
    const e = searchParams.get('e')

    if (a) setValue('a', Number(a))
    if (b) setValue('b', Number(b))
    if (e) setValue('e', Number(e))
  }, [searchParams, setValue])

  const updateSearchParams = (data: UseFormGetValues) => {
    setSearchParams({
      a: String(data.a),
      b: String(data.b),
      e: String(data.e)
    })
    return data
  }

  const onSubmit = async (data: { a: number; b: number; e: number }) => {
    const updatedData = updateSearchParams(data)

    const x0 = (updatedData.a + updatedData.b) / 2
    const eps = Math.pow(10, -updatedData.e)

    const root = newtonMethod({ x0, eps })
    const result = generateChartData(updatedData.a, updatedData.b, root)

    if (result) {
      setChartData(result)
      setChartsVisible(true)
    }
  }

  const handleClear = () => {
    setChartsVisible(false)
    setChartData(null)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-5"
    >
      <div className="flex gap-5">
        {formFields.map(({ name, placeholder }) => (
          <div className="flex flex-col gap-1 font-semibold" key={name}>
            <label htmlFor={name} className="text-sm text-gray-700">
              {placeholder}
            </label>
            <input
              {...register(name as 'a' | 'b' | 'e', { valueAsNumber: true })}
              type="number"
              placeholder="Число"
              key={name}
              id={`input${name.toUpperCase()}`}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
        >
          Обчислити
        </button>

        {chartsVisible && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
          >
            Очистити
          </button>
        )}
      </div>
    </form>
  )
}

export default FormComp
