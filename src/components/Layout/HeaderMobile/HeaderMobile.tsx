import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import omit from 'lodash/omit'

import authApi from 'src/apis/auth.api'
import purchaseApi from 'src/apis/purchase.api'
import logo from 'src/assets/logo.svg'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Schema, schema } from 'src/utils/rules'

import NavToggle from './NavToggle'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

export default function HeaderMobile() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryConfig = useQueryConfig()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const { data: ProductCart } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })
  const ProductDataCart = ProductCart?.data.data
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
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <>
      <div className='flex items-center justify-between px-4 py-4'>
        <Link to='/'>
          <img src={logo} alt='logo' width='166' height='51' />
        </Link>
        <div className='flex'>
          <div className='mr-12'>
            <SwitchThemeButton />
          </div>
          <NavToggle handleLogout={handleLogout} profile={profile} isAuthenticated={isAuthenticated} />
        </div>
      </div>
      <div className='mt-4 flex items-center justify-between gap-4 px-4'>
        <div className='relative w-full'>
          <form onSubmit={onSubmitSearch} noValidate>
            <input
              type='text'
              placeholder='Search by products, categories'
              className='h-10 w-full rounded-8 border border-gray-900 pl-3 pr-9 text-black placeholder:text-xs focus:outline-none'
              {...register('name')}
              autoComplete='off'
            />
            <button type='submit' className='absolute right-0 top-1/2 mr-6 -translate-y-1/2' aria-label='search'>
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
        <Link to={path.cart}>
          <div className='relative flex h-full flex-col justify-center rounded-8 border p-2 px-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5 lg:h-6 lg:w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
            {ProductDataCart && ProductDataCart.length > 0 && (
              <span className='fs-14 absolute -right-1 -top-2 flex h-2 w-2 items-center justify-center rounded-full border bg-white p-2 font-semibold text-primary-377DFF'>
                {ProductDataCart.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </>
  )
}
