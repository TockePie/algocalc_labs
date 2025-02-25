import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

export default function Main() {
  return (
    <main className="flex h-screen flex-col gap-5 p-5">
      <h1 className="mb-2 text-2xl font-bold">Сортування виборy</h1>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="elements">Кількість елементів</Label>
        <div className="flex gap-2">
          <Input type="number" id="elements" placeholder="Число" />
          <Button variant="outline">Згенерувати</Button>
        </div>
      </div>

      <div className="flex h-full max-h-96 gap-x-2">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="init-array">Початковий масив</Label>
          <Textarea
            className="h-54 resize-none"
            placeholder="Числа через кому"
            id="init-array"
          />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="result">Відсортований масив</Label>
          <Textarea className="h-54 resize-none" id="result" />
        </div>
      </div>
    </main>
  )
}
