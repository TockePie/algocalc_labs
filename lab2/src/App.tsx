import Footer from './components/Footer'
import Main from './components/Main'

declare global {
  interface Window {
    api?: {
      showDialog: (options: {
        type: string
        title: string
        message: string
      }) => void
    }
  }
}

export default function App() {
  return (
    <>
      <Main />
      <Footer />
    </>
  )
}
