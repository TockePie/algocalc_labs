import Header from './components/Header'
import FormComp from './components/FormComp'
import Charts from './components/Charts'
import ChartProvider from './common/context/ChartContext'
import Table from './components/Table'

export default function App() {
  return (
    <main className="flex flex-col gap-5 p-5">
      <Header />
      <ChartProvider>
        <FormComp />
        <Charts />
        <Table />
      </ChartProvider>
    </main>
  )
}
