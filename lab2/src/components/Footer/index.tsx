import { Button } from '@ui/button'
import { Info } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bottom-0 flex h-15 w-full items-center justify-between border-t border-neutral-300 px-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          window.api?.showDialog({
            type: 'info',
            title: 'Лабораторна робота',
            message: 'Максим Крадожон ІО-32\nВаріант 11'
          })
        }
      >
        <Info size={40} />
      </Button>

      <div className="flex gap-3">
        {/* TODO: Add onClick event handlers */}
        <Button variant="secondary">Вставити з файлу</Button>
        <Button variant="outline">Побудувати графік</Button>
        <Button variant="default">Обчислити</Button>
      </div>
    </footer>
  )
}
