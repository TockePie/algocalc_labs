import { type UseFormRegister } from 'react-hook-form'

import type { SolutionType } from '@/types/solution'

interface Props {
  label: string
  fields: Array<{ name: string }>
  register: UseFormRegister<SolutionType>
  columns?: 1 | 2 | 3 | 4 | 5 | 6
}

export default function MatrixInput({
  label,
  fields,
  register,
  columns = 4
}: Props) {
  const InputMap = fields.map(({ name }) => (
    <input
      type="number"
      step="any"
      placeholder={name}
      key={name}
      {...register(name, { valueAsNumber: true })}
      className="w-16 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
    />
  ))

  return (
    <div className="flex items-center gap-5">
      <label className="text-sm font-semibold text-gray-900">{label}</label>
      <div className={`grid gap-2 ${GRID_CLASSES[columns]}`}>{InputMap}</div>
    </div>
  )
}

const GRID_CLASSES = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6'
}
