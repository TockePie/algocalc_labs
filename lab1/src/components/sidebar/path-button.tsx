import { type PropsWithChildren } from 'react'
import clsx from 'clsx'

import type { Page } from '@/types/page'

import { usePage } from '../page-context'

interface Props extends PropsWithChildren {
  path: Page
}

function PathButton({ path, children }: Props) {
  const { page, setPage } = usePage()

  return (
    <button
      className={clsx(
        'w-full rounded-md border border-gray-300 bg-gray-50 p-2 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:border-stone-700 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-stone-900',
        page === path && 'bg-gray-300 dark:bg-stone-800'
      )}
      onClick={() => setPage(path)}
    >
      {children}
    </button>
  )
}

export default PathButton
