import { useState } from 'react'

interface AccordionProps {
  title: string
  content: JSX.Element
}

export default function Accordion({ title, content }: AccordionProps) {
  const [isActive, setIsActive] = useState(false)
  const handleToggle = () => {
    setIsActive((prev) => !prev)
  }
  return (
    <>
      <div className={`group duration-200 ${isActive ? 'is-active' : ''}`}>
        <button className='flex w-full items-center justify-between' onClick={handleToggle}>
          <p>{title}</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`h-6 w-6 duration-200 ${isActive ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </button>
        <div className='max-h-0 overflow-hidden duration-200 group-[.is-active]:max-h-[100px]'>{content}</div>
      </div>
    </>
  )
}
