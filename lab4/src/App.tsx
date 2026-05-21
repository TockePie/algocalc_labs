import { ChartProvider } from './common/chart-context'
import Charts from './components/Charts'
import FormComp from './components/FormComp'
import Header from './components/Header'

const App = () => {
  return (
    <main className="flex flex-col gap-5 p-5">
      <Header />
      <ChartProvider>
        <FormComp />
        <Charts />
      </ChartProvider>
    </main>
  )
}

export default App
