import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import ChartProvider from './common/context/chart-context.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ChartProvider>
        <App />
      </ChartProvider>
    </BrowserRouter>
  </StrictMode>
)
