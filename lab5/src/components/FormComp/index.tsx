import { useState } from 'react'

import gaussElimination from '@/lib/algorithm'
import type { SolutionType } from '@/types/solution'

import { aFormFields, bFormFields } from './common/form-fields'
import MatrixInput from './MatrixInput'

export default function FormComp({
  onSetSolution
}: {
  onSetSolution: (value: SolutionType | null) => void
}) {
  const [isCalculated, setIsCalculated] = useState(false)

  const handleAction = (formData: FormData) => {
    try {
      const getFieldValue = (name: string, defaultValue: number): number => {
        const rawValue = formData.get(name)
        if (rawValue === null || rawValue === '') return defaultValue
        const parsed = Number(rawValue)
        return isNaN(parsed) ? defaultValue : parsed
      }

      const aData = aFormFields.map((f) =>
        getFieldValue(f.name, f.defaultValue)
      )
      const bData = bFormFields.map((f) =>
        getFieldValue(f.name, f.defaultValue)
      )

      onSetSolution(gaussElimination(aData, bData))
      setIsCalculated(true)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Calculation error')
    }
  }

  const handleReset = () => {
    onSetSolution(null)
    setIsCalculated(false)
  }

  return (
    <form
      action={handleAction}
      className="flex w-full flex-col items-center gap-10"
    >
      <div className="flex w-full items-center justify-center gap-10">
        <MatrixInput label="Матриця А:" fields={aFormFields} />

        <MatrixInput label="Матриця B:" fields={bFormFields} columns={1} />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
        >
          Обчислити
        </button>
        {isCalculated && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
          >
            Очистити
          </button>
        )}
      </div>
    </form>
  )
}
