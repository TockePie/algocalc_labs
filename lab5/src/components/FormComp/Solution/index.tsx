import { Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'
import { type SolutionType } from '../../../types/solution'

const Solution = ({ solution }: { solution: SolutionType | null }) => {
  if (!solution) return null

  const Results = Object.entries(solution).map(([key, value]) => (
    <span key={key}>
      {key} = {value.toFixed(2)}
    </span>
  ))

  return (
    <Alert className="w-full max-w-2xl" variant="default">
      <Info />
      <AlertTitle>Розв'язок</AlertTitle>
      <AlertDescription className="flex gap-2">{Results}</AlertDescription>
    </Alert>
  )
}

export default Solution
