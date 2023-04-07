import { useEffect, useState } from 'react'
import { range } from 'lodash'

interface DateSelectProps {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: DateSelectProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='flex flex-col gap-2 md:gap-3'>
      <p className='fs-14 font-semibold capitalize md:fs-16'>Date Of Birth</p>
      <div className='flex gap-3 sm:gap-5'>
        <div className='relative w-1/3'>
          <select
            name='date'
            className='fs-14 h-10 w-full appearance-none rounded-10 border px-3 outline-none transition-colors placeholder:fs-14 md:fs-16 md:placeholder:fs-16 md:h-12 md:px-4'
            onChange={handleChange}
            value={value?.getDate() || date.date}
          >
            <option disabled>Date</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
            className='absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </div>
        <div className='relative w-1/3'>
          <select
            name='month'
            className='fs-14 h-10 w-full appearance-none rounded-10 border px-3 outline-none transition-colors placeholder:fs-14 md:fs-16 md:placeholder:fs-16 md:h-12 md:px-4'
            onChange={handleChange}
            value={value?.getMonth() || date.month}
          >
            <option disabled>Month</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
            className='absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </div>
        <div className='relative w-1/3'>
          <select
            name='year'
            className='fs-14 h-10 w-full appearance-none rounded-10 border px-3 outline-none transition-colors placeholder:fs-14 md:fs-16 md:placeholder:fs-16 md:h-12 md:px-4'
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
          >
            <option disabled>Year</option>
            {range(1990, 2030).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
            className='absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </div>
      </div>
      <div className='fs-12 mt-1 min-h-[1.25rem] text-red-600'>{errorMessage}</div>
    </div>
  )
}
