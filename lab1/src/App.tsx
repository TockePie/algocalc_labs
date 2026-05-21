import BranchingPage from '@/pages/branching'
import LinearPage from '@/pages/linear'
import LoopingPage from '@/pages/looping'

import { usePage } from './components/page-context'
import Sidebar from './components/sidebar'

function App() {
  const { page } = usePage()

  return (
    <div className="flex h-screen">
      <Sidebar />
      {page === 'linear' ? (
        <LinearPage />
      ) : page === 'branching' ? (
        <BranchingPage />
      ) : page === 'looping' ? (
        <LoopingPage />
      ) : null}
    </div>
  )
}

export default App
