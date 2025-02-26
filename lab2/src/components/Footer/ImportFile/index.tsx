import { useEffect } from 'react'
import { Button } from '@ui/button'
import { useFilePicker } from 'use-file-picker'

import { useElementsContext } from '@/common/elementsContext'
import showDialog from '@/utils/show-dialog'

export default function ImportFile() {
  const { openFilePicker, filesContent } = useFilePicker({
    accept: '.txt',
    multiple: false,
    readAs: 'Text'
  })
  const { setInitArray } = useElementsContext()

  useEffect(() => {
    if (!filesContent.length) return
    const content = filesContent[0].content

    const isValid = content
      .split(',')
      .every((item) => !isNaN(Number(item.trim())))
    if (!isValid) {
      showDialog('error', 'Помилка', 'Файл містить некоректні дані')
      return
    }

    setInitArray(content)
  }, [filesContent, setInitArray])

  return (
    <Button variant="ghost" onClick={() => openFilePicker()}>
      Вставити з файлу
    </Button>
  )
}
