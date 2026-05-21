import { useState } from 'react'
import { useForm } from 'react-hook-form'

import MatrixInput from './MatrixInput'
import Solution from './Solution'
import { aFormFields, bFormFields } from './common/form-fields'

import type { SolutionType } from '@/types/solution'
import gaussElimination from '@/lib/algorithm'

const FormComp = () => {
  const [solution, setSolution] = useState<SolutionType | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitted }
  } = useForm<SolutionType>({
    mode: 'onChange'
  })

  const validateAndFixNaNValues = (data: SolutionType): boolean => {
    const allFields = [...aFormFields, ...bFormFields]
    let hasNaN = false

    for (const { name, defaultValue } of allFields) {
      if (isNaN(data[name])) {
        hasNaN = true
        setValue(name, defaultValue)
      }
    }

    return hasNaN
  }

  const onSubmit = async (data: SolutionType) => {
    if (validateAndFixNaNValues(data)) {
      setTimeout(() => handleSubmit(onSubmit)(), 0)
      return
    }

    try {
      const aData = aFormFields.map((field) => data[field.name])
      const bData = bFormFields.map((field) => data[field.name])

      setSolution(gaussElimination(aData, bData))
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Calculation error')
    }
  }

  const handleReset = () => {
    setSolution(null)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-10"
    >
      <div className="flex w-full items-center justify-center gap-10">
        <MatrixInput
          label="Матриця А:"
          fields={aFormFields}
          register={register}
        />

        <MatrixInput
          label="Матриця B:"
          fields={bFormFields}
          register={register}
          columns={1}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
        >
          Обчислити
        </button>
        {isSubmitted && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
          >
            Очистити
          </button>
        )}
      </div>

      <Solution solution={solution} />
    </form>
  )
}

export default FormComp
