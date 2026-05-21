import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </NextThemesProvider>
  </StrictMode>
)
