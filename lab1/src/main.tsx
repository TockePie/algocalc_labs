import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import OutletComponent from './components/outlet.tsx'
import BranchingPage from './pages/branching.tsx'
import LinearPage from './pages/linear.tsx'
import LoopingPage from './pages/looping.tsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <OutletComponent />,
    children: [
      {
        path: 'linear',
        element: <LinearPage />
      },
      {
        path: 'branching',
        element: <BranchingPage />
      },
      {
        path: 'looping',
        element: <LoopingPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
