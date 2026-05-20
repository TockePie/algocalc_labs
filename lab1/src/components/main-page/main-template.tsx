import { useEffect, useRef } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useFilePicker } from 'use-file-picker'

import InputField from '@/components/input-field'
import isValidJson from '@/utils/is-json'
import showDialog from '@/utils/show-dialog'

interface Input {
  name: string
  type: 'string' | 'number'
  placeholder: string
  labelName: string
  required: boolean
  valueAsNumber?: boolean
}

interface Props {
  title: string
  imageSrc: string
  inputs: Input[]
  computeFunction: (
    data: any
  ) => number | { type: 'info' | 'error'; title: string; message: string }
  filePickerAccept: string
}

function GenericPage({
  title,
  imageSrc,
  inputs,
  computeFunction,
  filePickerAccept
}: Props) {
  const { openFilePicker, filesContent } = useFilePicker({
    accept: filePickerAccept,
    multiple: false,
    readAs: 'Text'
  })
  const { register, handleSubmit } = useForm()
  const submitRef = useRef<HTMLInputElement>(null)

  const onSubmit: SubmitHandler<any> = (data) => {
    const computedValue = computeFunction(data)
    if (typeof computedValue === 'object') {
      showDialog(computedValue.type, computedValue.title, computedValue.message)
      return
    }
    showDialog('info', 'Результат', `y = ${computedValue}`)
  }

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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {inputs.map((input) => (
          <InputField
            key={input.name}
            type={input.type}
            placeholder={input.placeholder}
            labelName={input.labelName}
            required={input.required}
            {...register(input.name, { valueAsNumber: input.valueAsNumber })}
          />
        ))}
        <input type="submit" className="hidden" ref={submitRef} />
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
          onClick={() => submitRef.current?.click()}
        >
          Обрахувати
        </button>
      </div>
    </main>
  )
}

export type { Input }
export default GenericPage
