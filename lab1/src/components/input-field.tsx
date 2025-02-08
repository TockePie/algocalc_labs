import { forwardRef } from 'react'

interface InputFieldProps {
  name: string
  type: 'string' | 'number'
  placeholder: string
  labelName: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ name, type, placeholder, labelName, ...rest }, ref) => {
    return (
      <div className="mx-auto flex items-center gap-x-4">
        <label htmlFor={name} className="text-gray-600 dark:text-zinc-400">
          {labelName}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className="rounded-lg border border-gray-300 p-2 px-3 hover:border-gray-400 focus:border-blue-500 focus:outline-none dark:border-stone-700 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-stone-900 dark:focus:border-white"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
      </div>
    )
  }
)

InputField.displayName = 'InputField'

export default InputField
