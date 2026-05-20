import { useActionState, useEffect, useRef } from 'react'
import { useFilePicker } from 'use-file-picker'

import InputField from '@/components/input-field'
import type { Input } from '@/types/input'
import isValidJson from '@/utils/is-json'
import showDialog from '@/utils/show-dialog'

interface Props {
  title: string
  imageSrc: string
  inputs: Input[]
  computeFunction: (
    data: any
  ) => number | { type: 'info' | 'error'; title: string; message: string }
}

function GenericPage({ title, imageSrc, inputs, computeFunction }: Props) {
  const { openFilePicker, filesContent } = useFilePicker({
    accept: '.json',
    multiple: false,
    readAs: 'Text'
  })
  const formRef = useRef<HTMLFormElement>(null)

  const formAction = async (prevState: any, formData: FormData) => {
    const data: Record<string, any> = {}

    inputs.forEach((input) => {
      const rawValue = formData.get(input.name)
      if (input.valueAsNumber) {
        data[input.name] = rawValue ? Number(rawValue) : NaN
      } else {
        data[input.name] = rawValue
      }
    })

    const computedValue = computeFunction(data)
    if (typeof computedValue === 'object') {
      showDialog(computedValue.type, computedValue.title, computedValue.message)
      return null
    }
    showDialog('info', 'Результат', `y = ${computedValue}`)
    return null
  }

  const [, action, isPending] = useActionState(formAction, null)

  useEffect(() => {
    if (!filesContent.length) return
    const content = filesContent[0].content

    if (!isValidJson(content)) {
      showDialog('error', 'Помилка', 'Файл містить некоректні дані')
      return
    }

    const jsonData = JSON.parse(content)
    const computedValue = computeFunction(jsonData)
    showDialog('info', 'Результат', `y = ${computedValue}`)
  }, [filesContent, computeFunction])

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
