import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
