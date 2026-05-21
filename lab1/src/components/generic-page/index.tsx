import { useActionState, useRef } from 'react'
import { useFilePicker } from 'use-file-picker'

import InputField from '@/components/input-field'
import type { Input } from '@/types/input'
import isValidJson from '@/utils/is-json'
import showDialog from '@/utils/show-dialog'

interface ComputeError {
  type: 'info' | 'error'
  title: string
  message: string
}

interface Props<T extends Record<string, unknown>> {
  title: string
  imageSrc: string
  inputs: Input[]
  computeFunction: (data: T) => number | ComputeError
}

function GenericPage<T extends Record<string, unknown>>({
  title,
  imageSrc,
  inputs,
  computeFunction
}: Props<T>) {
  const { openFilePicker } = useFilePicker({
    accept: '.json',
    multiple: false,
    readAs: 'Text',
    onFilesSelected: (data) => {
      if (!data?.filesContent || data.filesContent.length === 0) return

      const content = data.filesContent[0].content

      if (!isValidJson(content)) {
        showDialog('error', 'Помилка', 'Файл містить некоректні дані')
        return
      }

      try {
        const jsonData = JSON.parse(content) as T
        const computedValue = computeFunction(jsonData)

        if (typeof computedValue === 'object') {
          showDialog(
            computedValue.type,
            computedValue.title,
            computedValue.message
          )
          return
        }
        showDialog('info', 'Результат', `y = ${computedValue}`)
      } catch {
        showDialog('error', 'Помилка', 'Не вдалося розпарсити JSON')
      }
    }
  })

  const formRef = useRef<HTMLFormElement>(null)

  const formAction = async (
    _prevState: null | ComputeError | number,
    formData: FormData
  ) => {
    const rawParsedData: Record<string, string | number | null> = {}

    inputs.forEach((input) => {
      const rawValue = formData.get(input.name)
      if (typeof rawValue === 'string') {
        rawParsedData[input.name] = input.valueAsNumber
          ? rawValue
            ? Number(rawValue)
            : NaN
          : rawValue
      } else {
        rawParsedData[input.name] = null
      }
    })

    const computedValue = computeFunction(rawParsedData as T)
    if (typeof computedValue === 'object') {
      showDialog(computedValue.type, computedValue.title, computedValue.message)
      return null
    }
    showDialog('info', 'Результат', `y = ${computedValue}`)
    return null
  }

  const [, action, isPending] = useActionState(formAction, null)

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 dark:bg-black">
      <h1 className="text-center text-xl font-bold dark:text-gray-200">
        {title}
      </h1>
      <img
        src={imageSrc}
        alt={title}
        className="mx-auto max-h-40 w-70 rounded-lg border border-gray-300"
      />

      <form ref={formRef} action={action} className="flex flex-col gap-4">
        {inputs.map((input) => (
          <InputField
            key={input.name}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            labelName={input.labelName}
            disabled={isPending}
            required
          />
        ))}
      </form>

      <div className="flex h-full items-end justify-end gap-x-2">
        <button
          type="button"
          className="rounded-md bg-neutral-100 px-3 py-1.5 font-medium hover:bg-neutral-200 active:bg-neutral-300 dark:border dark:border-stone-800 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-stone-800"
          onClick={() => openFilePicker()}
        >
          Ввести з файлу
        </button>
        <button
          className="rounded-md bg-blue-500 px-3 py-1.5 font-medium text-white hover:bg-blue-700 dark:bg-gray-200 dark:text-black dark:hover:bg-neutral-400"
          type="submit"
          onClick={() => formRef.current?.requestSubmit()}
        >
          Обрахувати
        </button>
      </div>
    </main>
  )
}

export default GenericPage
