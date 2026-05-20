import { useState } from 'react'

import calculateAiken from '@/lib/aiken'
import { useChartContext } from '@/common/context/ChartContext'

export default function FormComp() {
  const { chartsVisible, setChartsVisible, setChartData } = useChartContext()
  const [values, setValues] = useState({
    a: 0,
    b: 4,
    n: 10
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value === '' ? 0 : Number(value)
    }))
  }

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = calculateAiken(values.a, values.b, values.n)
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
    { name: 'a', placeholder: 'Значення A', value: values.a },
    { name: 'b', placeholder: 'Значення B', value: values.b },
    { name: 'n', placeholder: 'Значення N', value: values.n }
  ] as const

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col items-center gap-5"
    >
      <div className="flex gap-5">
        {formFields.map(({ name, placeholder, value }) => (
          <div className="flex flex-col gap-1 font-semibold" key={name}>
            <label htmlFor={name} className="text-sm text-gray-700">
              {placeholder}
            </label>

            <input
              name={name}
              id={name}
              type="number"
              placeholder="Число"
              value={value}
              onChange={handleChange}
              required
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
