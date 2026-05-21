/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

interface ElementsContextType {
  elements: string
  setElements: React.Dispatch<React.SetStateAction<string>>
  initArray: string
  setInitArray: React.Dispatch<React.SetStateAction<string>>
  resultArray: string
  setResultArray: React.Dispatch<React.SetStateAction<string>>
  executionTime: number | null
  setExecutionTime: React.Dispatch<React.SetStateAction<number | null>>
}

export const ElementsContext = createContext<ElementsContextType | undefined>(
  undefined
)

export const ElementsProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [elements, setElements] = useState('')
  const [initArray, setInitArray] = useState('')
  const [resultArray, setResultArray] = useState('')
  const [executionTime, setExecutionTime] = useState<number | null>(null)

  return (
    <ElementsContext.Provider
      value={{
        elements,
        setElements,
        initArray,
        setInitArray,
        resultArray,
        setResultArray,
        executionTime,
        setExecutionTime
      }}
    >
      {children}
    </ElementsContext.Provider>
  )
}

export const useElementsContext = () => {
  const context = useContext(ElementsContext)

  if (!context) {
    throw new Error('ElementsContext must be used within an ElementsProvider')
  }

  return context
}
