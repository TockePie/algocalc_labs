import { UseFormRegister } from 'react-hook-form'

import { Input } from '../../ui/input'
import { Label } from '../../ui/label'

import { SolutionType } from '../../../types/solution'
import clsx from 'clsx'

type MatrixInputProps = {
  label: string
  fields: Array<{ name: string }>
  register: UseFormRegister<SolutionType>
  columns?: 1 | 2 | 3 | 4 | 5 | 6
}

const gridClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6'
}

const MatrixInput = ({
  label,
  fields,
  register,
  columns = 4
}: MatrixInputProps) => {
  const InputMap = fields.map(({ name }) => (
    <Input
      type="number"
      step="any"
      placeholder={name}
      key={name}
      {...register(name, { valueAsNumber: true })}
      className="w-16"
    />
  ))

  return (
    <div className="flex gap-5">
      <Label>{label}</Label>
      <div className={clsx(`grid gap-2`, gridClasses[columns])}>{InputMap}</div>
    </div>
  )
}

export default MatrixInput
