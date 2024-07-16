import React, { useState } from 'react'

import InputNumber, { InputNumberProps } from '../InputNumber'
interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onTyping?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onTyping,
  onFocusOut,
  classNameWrapper = '',
  value,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onTyping && onTyping(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(e.target.value))
  }

  return (
    <div className={'flex items-center gap-1 ' + classNameWrapper}>
      <button
        className='flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-8 border bg-transparent p-2 transition-colors lg:h-8 lg:w-8'
        onClick={decrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
      </button>
      <InputNumber
        className='flex h-7 w-9 flex-shrink-0 items-center overflow-hidden rounded-8 border bg-white lg:h-8 lg:w-20'
        classNameError='hidden'
        classNameInput='px-2 w-full h-full border-none bg-transparent text-center outline-none placeholder:fs-14'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value || localValue}
        {...rest}
      />
      <button
        className='flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-8 border bg-transparent p-2 transition-colors lg:h-8 lg:w-8'
        onClick={increase}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </button>
    </div>
  )
}
