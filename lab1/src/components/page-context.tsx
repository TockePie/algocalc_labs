import { createContext, useContext, useState } from 'react'

import type { Page } from '@/types/page'

interface ContextProps {
  page: Page
  setPage: React.Dispatch<React.SetStateAction<Page>>
}

const PageContext = createContext<ContextProps | undefined>(undefined)

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>('linear')

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePage() {
  const context = useContext(PageContext)
  if (!context) {
    throw new Error('usePage must be used inside a PageProvider')
  }
  return context
}
