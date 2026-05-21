import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { PageProvider } from './components/page-context.tsx'
import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageProvider>
      <App />
    </PageProvider>
  </StrictMode>
)
