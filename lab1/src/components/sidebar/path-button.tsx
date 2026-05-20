import { type PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router'
import clsx from 'clsx'

interface PathButtonProps {
  path: string
  children: React.ReactNode | string
}

function PathButton({ path, children }: PropsWithChildren<PathButtonProps>) {
  const location = useLocation()

  return (
    <Link to={path}>
      <button
        className={clsx(
          'w-full rounded-md border border-gray-300 bg-gray-50 p-2 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:border-stone-700 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-stone-900',
          location.pathname.slice(1) === path && 'bg-gray-300 dark:bg-stone-800'
        )}
      >
        {children}
      </button>
    </Link>
  )
}

export default PathButton
