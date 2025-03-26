import { useForm } from 'react-hook-form'

import Buttons from './Buttons'
import { formFields } from './common/form-fields'

import { Label } from '../ui/label'
import { Input } from '../ui/input'

import useChartContext from '../../common/hooks/use-chart-context'
import useFormSearchParams from '../../common/hooks/use-form-search-param'
import newtonMethod from '../../lib/algorithm'
import generateChartData from '../../utils/generate-chart-data'

const FormComp = () => {
  const { setChartsVisible, setChartData } = useChartContext()
  const { register, handleSubmit, setValue } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: { a: 0, b: 4, e: 6 }
  })
  const { updateSearchParams } = useFormSearchParams(setValue)

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
              {...register(name as 'a' | 'b' | 'e', { valueAsNumber: true })}
              type="number"
              placeholder="Число"
              key={name}
              id={`input${name.toUpperCase()}`}
            />
          </div>
        ))}
      </div>

      <Buttons />
    </form>
  )
}

export default FormComp
