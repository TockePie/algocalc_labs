import { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

type FormValues = {
  a: number
  b: number
  e: number
}

const useFormSearchParams = (setValue: UseFormSetValue<FormValues>) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getInitialValues = () => ({
    a: searchParams.get('a') ? Number(searchParams.get('a')) : 0,
    b: searchParams.get('b') ? Number(searchParams.get('b')) : 4,
    e: searchParams.get('e') ? Number(searchParams.get('e')) : 6
  })

  useEffect(() => {
    const a = searchParams.get('a')
    const b = searchParams.get('b')
    const e = searchParams.get('e')

    if (a) setValue('a', Number(a))
    if (b) setValue('b', Number(b))
    if (e) setValue('e', Number(e))
  }, [searchParams, setValue])

  const updateSearchParams = (data: FormValues) => {
    setSearchParams({
      a: String(data.a),
      b: String(data.b),
      e: String(data.e)
    })
    return data
  }

  return {
    getInitialValues,
    updateSearchParams
  }
}

export default useFormSearchParams
