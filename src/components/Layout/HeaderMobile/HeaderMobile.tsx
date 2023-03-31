import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import path from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { schema, Schema } from 'src/utils/rules'
import NavToggle from './NavToggle'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

export default function HeaderMobile() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.productlist,
      search: createSearchParams(config).toString()
    })
  })
  return (
    <>
      <div className='flex items-center justify-between py-4 px-4'>
        <Link to='/'>
          <img src={logo} alt='logo' width='166' height='51' />
        </Link>
        <div className='flex'>
          <div className='mr-12'>
            <SwitchThemeButton />
          </div>
          <NavToggle />
        </div>
      </div>
      <div className='relative mt-4 px-4'>
        <form onSubmit={onSubmitSearch} noValidate>
          <input
            type='text'
            placeholder='Search by products, categories'
            className='h-10 w-full rounded-8 border border-gray-900 pl-3 pr-9 text-black placeholder:text-xs focus:outline-none'
            {...register('name')}
            autoComplete='off'
          />
          <button type='submit' className='absolute top-1/2 right-0 mr-6 -translate-y-1/2' aria-label='search'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 duration-200 hover:text-secondary-1D6AF9 dark:text-black dark:hover:text-secondary-1D6AF9'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}
