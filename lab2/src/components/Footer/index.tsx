import { Button } from '@ui/button'
import { Info } from 'lucide-react'

import Calculate from './Calculate'
import CreatePlot from './CreatePlot'
import ImportFile from './ImportFile'

export default function Footer() {
  return (
    <footer className="bottom-0 flex h-15 w-full items-center justify-between border-t border-neutral-300 px-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          alert('Лабораторна робота №2.\nМаксим Крадожон ІО-32\nВаріант 11')
        }}
      >
        <Info size={40} />
      </Button>

      <div className="flex gap-3">
        <ImportFile />
        <CreatePlot />
        <Calculate />
      </div>
    </footer>
  )
}
