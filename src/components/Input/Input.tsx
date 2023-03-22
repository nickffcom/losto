import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

export default function Input({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  autoComplete
}: InputProps) {
  return (
    <>
      <div className={className}>
        <input
          className='h-12 w-full rounded-lg border px-10'
          placeholder={placeholder}
          type={type}
          {...register(name)}
          autoComplete={autoComplete}
        />
      </div>
      <div className='mt-1 min-h-[1.5rem] text-sm text-red-600 '>{errorMessage}</div>
    </>
  )
}
