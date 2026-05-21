import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { Label } from '@ui/label'
import { Textarea } from '@ui/textarea'

import { useElementsContext } from '@/common/elementsContext'
import generateArray from '@/utils/generate-array'

export default function Main() {
  const {
    elements,
    setElements,
    initArray,
    setInitArray,
    resultArray,
    executionTime
  } = useElementsContext()

  const handleGenerate = () => {
    const count = parseInt(elements, 10)
    if (isNaN(count) || count <= 0) return

    const numElements = generateArray(count)
    setInitArray(numElements.join(', '))
  }

  return (
    <main className="flex h-[calc(100vh-60px)] flex-col gap-6 bg-neutral-50/60 p-6">
      <div className="flex flex-row items-center justify-between border-b border-neutral-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Сортування вибору
        </h1>

        {executionTime !== null && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
            Час виконання: <b>{executionTime.toFixed(6)} мс</b>
          </div>
        )}
      </div>

      <div className="max-w-xl rounded-xl border border-neutral-200 bg-white p-4">
        <div className="grid gap-2">
          <Label
            htmlFor="elements"
            className="text-sm font-medium text-neutral-700"
          >
            Кількість елементів для генерації
          </Label>
          <div className="flex gap-3">
            <Input
              type="number"
              id="elements"
              placeholder="Введіть число (напр. 500)"
              value={elements}
              onChange={(e) => setElements(e.target.value)}
              className="max-w-50"
            />
            <Button
              variant="default"
              onClick={handleGenerate}
              className="cursor-pointer shadow-xs"
            >
              Згенерувати масив
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-2 grid min-h-0 flex-1 grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex h-full flex-col gap-2">
          <Label
            htmlFor="init-array"
            className="px-0.5 text-sm font-medium text-neutral-700"
          >
            Початковий масив
          </Label>
          <div className="relative min-h-40 flex-1 md:min-h-0">
            <Textarea
              className="absolute inset-0 h-full w-full resize-none border-neutral-200 bg-white p-4 font-mono text-sm leading-relaxed shadow-xs focus-visible:ring-1"
              placeholder="Введіть числа через кому або скористайтеся кнопкою генерації вище..."
              id="init-array"
              value={initArray}
              onChange={(e) => setInitArray(e.target.value)}
            />
          </div>
        </div>

        <div className="flex h-full flex-col gap-2">
          <Label
            htmlFor="result"
            className="px-0.5 text-sm font-medium text-neutral-700"
          >
            Відсортований масив
          </Label>
          <div className="relative min-h-40 flex-1 md:min-h-0">
            <Textarea
              className="absolute inset-0 h-full w-full cursor-default resize-none border-neutral-200 bg-neutral-50/80 p-4 font-mono text-sm leading-relaxed text-neutral-800 shadow-inner select-all"
              placeholder="Тут відобразиться результат після сортування..."
              id="result"
              value={resultArray}
              readOnly
            />
          </div>
        </div>
      </div>
    </main>
  )
}
