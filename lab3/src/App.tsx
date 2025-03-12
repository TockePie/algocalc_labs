import Header from './components/Header'
import FormComp from './components/FormComp'
import Charts from './components/Charts'

export default function App() {
  return (
    <main className="flex flex-col gap-5 p-5">
      <Header />
      <FormComp />
      <Charts />
    </main>
  )
}
