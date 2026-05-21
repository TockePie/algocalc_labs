interface Props {
  label: string
  fields: Array<{ name: string; defaultValue: number }>
  columns?: 1 | 2 | 3 | 4 | 5 | 6
}

export default function MatrixInput({ label, fields, columns = 4 }: Props) {
  return (
    <div className="flex items-center gap-5">
      <label className="text-sm font-semibold text-gray-900">{label}</label>
      <div className={`grid gap-2 ${GRID_CLASSES[columns]}`}>
        {fields.map(({ name, defaultValue }) => (
          <input
            type="number"
            step="any"
            name={name}
            placeholder={name}
            defaultValue={defaultValue}
            key={name}
            className="w-16 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
          />
        ))}
      </div>
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
