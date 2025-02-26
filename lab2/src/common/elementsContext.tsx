import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'

interface ElementsContextType {
  elements: string
  setElements: Dispatch<SetStateAction<string>>
  initArray: string
  setInitArray: Dispatch<SetStateAction<string>>
  resultArray: string
  setResultArray: Dispatch<SetStateAction<string>>
}

export const ElementsContext = createContext<ElementsContextType | undefined>(
  undefined
)

export const ElementsProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState('')
  const [initArray, setInitArray] = useState('')
  const [resultArray, setResultArray] = useState('')

  return (
    <ElementsContext.Provider
      value={{
        elements,
        setElements,
        initArray,
        setInitArray,
        resultArray,
        setResultArray
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
