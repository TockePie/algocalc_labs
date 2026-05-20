import PathButton from './path-button'

function Sidebar() {
  return (
    <aside
      className="flex h-screen w-74 flex-col justify-between bg-gray-200 p-4 dark:border-r dark:border-stone-800 dark:bg-neutral-950"
      aria-label="Sidebar Navigation"
    >
      <div>
        <h1 className="text-center text-xl font-bold dark:text-gray-200">
          Алгоритми
        </h1>

        <nav
          aria-label="Algorithm Categories"
          className="mt-4 flex flex-col gap-y-3"
        >
          <PathButton path="linear">Лінійні</PathButton>
          <PathButton path="branching">Розгалуджувальні</PathButton>
          <PathButton path="looping">Циклічні</PathButton>
        </nav>
      </div>

      <div className="border-t pt-1 text-gray-300 dark:text-stone-800">
        <p className="py-2 text-sm text-gray-400 dark:text-neutral-500">
          Крадожон Максим Романович
        </p>
        <p className="text-sm text-gray-400 dark:text-neutral-500">
          ІО-32 • 15 варіант
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
