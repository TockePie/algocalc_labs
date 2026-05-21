import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import MatrixInput from './MatrixInput'
import Solution from './Solution'
import { aFormFields, bFormFields } from './common/form-fields'

import gaussElimination from '../../lib/algorithm'
import { type SolutionType } from '../../types/solution'
import { Button } from '../ui/button'

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
      toast.error(error instanceof Error ? error.message : 'Calculation error')
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
        <Button type="submit">Обчислити</Button>
        {isSubmitted && (
          <Button type="button" variant="secondary" onClick={handleReset}>
            Очистити
          </Button>
        )}
      </div>

      <Solution solution={solution} />
    </form>
  )
}

export default FormComp
