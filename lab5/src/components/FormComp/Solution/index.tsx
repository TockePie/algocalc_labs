import type { SolutionType } from '@/types/solution'

export default function Solution({
  solution
}: {
  solution: SolutionType | null
}) {
  if (!solution) return null

  const results = Object.entries(solution).map(([key, value]) => (
    <span key={key}>
      {key} = {value.toFixed(2)}
    </span>
  ))

  return (
    <div className="flex w-full max-w-xl flex-col gap-1 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h5 className="font-medium">Розв'язок</h5>
      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        {results}
      </div>
    </div>
  )
}
