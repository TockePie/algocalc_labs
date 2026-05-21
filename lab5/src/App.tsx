import { useState } from 'react'

import FormComp from './components/FormComp'
import Solution from './components/Solution'
import type { SolutionType } from './types/solution'

export default function App() {
  const [solution, setSolution] = useState<SolutionType | null>(null)

  return (
    <main className="flex flex-col items-center gap-5 p-5">
      <h1 className="w-full text-center text-3xl font-extrabold">
        Метод Гауса з послідовним виключенням невідомих
      </h1>
      <img src="/formula.jpeg" alt="formula" className="mx-auto w-160" />

      <FormComp onSetSolution={(value) => setSolution(value)} />
      <Solution solution={solution} />
    </main>
  )
}
