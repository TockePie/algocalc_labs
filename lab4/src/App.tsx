import Header from './components/Header'
import FormComp from './components/FormComp'
import Charts from './components/Charts'

const App = () => {
  return (
    <main className="flex flex-col gap-5 p-5">
      <Header />
      <FormComp />
      <Charts />
    </main>
  )
}

export default App
