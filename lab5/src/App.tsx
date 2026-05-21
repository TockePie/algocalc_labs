import { Toaster } from './components/ui/sonner'

import Header from './components/Header'
import FormComp from './components/FormComp'

export default function App() {
  return (
    <main className="flex flex-col gap-5 p-5">
      <Header />
      <FormComp />
      <Toaster />
    </main>
  )
}
