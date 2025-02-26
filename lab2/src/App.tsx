import { ElementsProvider } from './common/elementsContext'
import Footer from './components/Footer'
import Main from './components/Main'

export default function App() {
  return (
    <ElementsProvider>
      <Main />
      <Footer />
    </ElementsProvider>
  )
}
