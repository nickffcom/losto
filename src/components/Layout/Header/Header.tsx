import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import { useDetectClickOutside } from 'react-detect-click-outside'
import logo from 'src/assets/logo.svg'
import Popover from 'src/components/Popover'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import SwitchThemeButton from '../../SwitchThemeButton'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Controller, useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { debounce, omit } from 'lodash'
import productApi from 'src/apis/product.api'
import { Product } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'
import purchaseApi from 'src/apis/purchase.api'
import { purchaseStatus } from 'src/constants/purchase'
import userImage from 'src/assets/images/user.svg'

const HEADER_HEIGHT = 99

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

const MAX_PRODUCT = 5

export default function Header() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const [isFixedHeader, setIsFixedHeader] = useState(false)
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState<Product[]>([])
  const [isShow, setIsShow] = useState<boolean>(false)
  const queryClient = useQueryClient()

  /* Handle search realtime */
  const { data: DataProductSearch, isLoading } = useQuery({
    queryKey: ['product-search', searchText],
    queryFn: () => {
      return productApi.searchProduct(searchText)
    }
  })

  const debounceChange = useMemo(
    () =>
      debounce(async (searchValue) => {
        if (searchValue === '') {
          setData([])
        } else {
          setSearchText(searchValue)
          setIsShow(true)
        }
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  /* End handle search realtime */

  /* Handle click out side */
  const disableIsShow = () => {
    setIsShow(false)
  }
  const divRef = useDetectClickOutside({ onTriggered: disableIsShow })
  /* End handle click out side */

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  /* Handle logout */
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
  /* End handle logout */

  /* Handle fixed menu */
  useEffect(() => {
    function handleScroll() {
      setIsFixedHeader(window.scrollY > HEADER_HEIGHT)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // no need for separate onscroll function

  /* End handle fixed menu */

  /* Show data info */
  const text = profile?.name
  /* End show data */

  /* Handle submit search to productlist */
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

  const { data: ProductCart } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })
  const ProductDataCart = ProductCart?.data.data

  return (
    <div className='bg-F8F8FB shadow-md dark:bg-transparent'>
      <header className='py-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <Link to='/'>
              <img src={logo} alt='logo' width='166' height='51' />
            </Link>
            <div className='flex items-center gap-5'>
              <SwitchThemeButton />
              <Popover
                className='flex h-10 cursor-pointer flex-col justify-center rounded-8 border border-gray-400 px-2 duration-200 hover:border-primary-377DFF'
                renderPopover={
                  <div className='rounded-4 border border-gray-200 bg-white shadow-md'>
                    <div className='fs-14 flex flex-col items-start py-2 px-3'>
                      <button className='py-2 px-3 hover:bg-FAFAFD hover:text-secondary-1D6AF9'>Vietnamese</button>
                      <button className='py-2 px-3 hover:bg-FAFAFD hover:text-secondary-1D6AF9'>English</button>
                    </div>
                  </div>
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802'
                  />
                </svg>
              </Popover>
              {isAuthenticated && (
                <Popover
                  className='flex cursor-pointer items-center justify-center gap-2 duration-200 hover:text-secondary-1D6AF9'
                  renderPopover={
                    <div className='rounded-4 border border-gray-200 bg-white shadow-md'>
                      <div className='fs-14 flex flex-col items-start'>
                        <Link
                          to={path.profile}
                          className='w-full py-3 px-5 text-left hover:bg-FAFAFD hover:text-secondary-1D6AF9'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='mr-2 inline-block h-5 w-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                            />
                          </svg>
                          Profile
                        </Link>
                        <button className='w-full py-3 px-5 text-left hover:bg-FAFAFD hover:text-secondary-1D6AF9'>
                          <svg
                            className='mr-2 inline-block h-5 w-5'
                            viewBox='0 0 1024 1024'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M838.622966 942.430216H185.377034c-35.697013 0-65.319681-26.76355-68.922742-62.274322L65.649186 381.233748c-1.99647-19.464307 4.39817-38.953174 17.509792-53.476959 13.111622-14.515598 31.856545-22.839171 51.41295-22.839171h754.837724c19.573801 0 38.318724 8.331759 51.430346 22.847357 13.111622 14.523785 19.506263 34.013675 17.509793 53.468773l-50.804083 498.922146c-3.586688 35.493375-33.225729 62.274322-68.922742 62.274322zM134.572952 374.212844l50.804082 498.939543h0.017397v0.033769l653.229558-0.051166 50.804083-498.922146H134.572952z'
                              fill='#444444'
                            />
                            <path
                              d='M678.30977 452.043467c-19.133779 0-34.648125-15.513322-34.648125-34.647102V185.512111c0-19.108197-15.547091-34.648125-34.648124-34.648125h-194.029088c-19.10001 0-34.647101 15.538905-34.647102 34.648125v231.883231c0 19.133779-15.513322 34.647101-34.648124 34.647101-19.133779 0-34.647101-15.513322-34.647102-34.647101V185.512111c0-57.317427 46.6249-103.94335 103.943351-103.943351h194.029088c57.317427 0 103.94335 46.6249 103.943351 103.943351v231.883231c0 19.133779-15.513322 34.648125-34.648125 34.648125z'
                              fill='#444444'
                            />
                            <path
                              d='M719.891817 717.227128H304.120462v51.971675c0 19.135826 15.512299 34.647101 34.648125 34.647101h346.476129c19.135826 0 34.648125-15.512299 34.648125-34.647101v-51.971675z'
                              fill='#00D8A0'
                            />
                          </svg>
                          Purchase
                        </button>
                        <button
                          className='w-full py-3 px-5 text-left hover:bg-FAFAFD hover:text-secondary-1D6AF9'
                          onClick={handleLogout}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='mr-2 inline-block h-5 w-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  }
                >
                  <Link to={path.profile} className='fs-14 font-semibold'>
                    <span>{profile?.email}</span>
                  </Link>
                  <div className='relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600'>
                    <img src={profile?.avatar ? profile?.avatar : userImage} alt='avatar' className='p-2' />
                  </div>
                </Popover>
              )}
              {!isAuthenticated && (
                <>
                  <Link to={path.login} className='button-primary'>
                    <span>Login</span>
                  </Link>
                  <Link to={path.register} className='button-primary'>
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <div
        className={`border-t-2 dark:border-t-neutral-800 ${
          isFixedHeader ? 'b-sd-1 fixed top-0 z-10 w-full bg-white' : 'block'
        }`}
      >
        <div className='container mx-auto flex h-16 items-center justify-between'>
          <div className='fs-16 font-semibold dark:text-white'>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/' aria-current='page'>
              Home
            </Link>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/productlist'>
              Shop
            </Link>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/about'>
              About
            </Link>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/contact'>
              Contact
            </Link>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/faq'>
              FAQs
            </Link>
          </div>
          <div className='flex items-center gap-5'>
            <form onSubmit={onSubmitSearch}>
              <div className='relative'>
                <Controller
                  control={control}
                  name='name'
                  defaultValue=''
                  render={({ field: { onChange, value } }) => (
                    <input
                      type='text'
                      placeholder='Search by products, categories'
                      className='h-10 rounded-8 border border-gray-900 pl-3 pr-9 text-black placeholder:text-xs focus:outline-none'
                      value={value}
                      onChange={(event) => {
                        onChange(event)
                        debounceChange(event.target.value)
                      }}
                      autoComplete='off'
                    />
                  )}
                />

                <button type='submit' className='absolute top-1/2 right-0 mr-2 -translate-y-1/2' aria-label='search'>
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
                <div
                  className={`b-sd-1 absolute top-full z-10 max-h-[400px] min-h-[80px] w-full rounded-8 bg-white ${
                    isShow ? 'block' : 'hidden'
                  }`}
                  ref={divRef}
                >
                  {isLoading && (
                    <div className='flex h-20 items-center justify-center'>
                      <svg
                        aria-hidden='true'
                        role='status'
                        className='mr-3 ml-2 inline h-8 w-8 animate-spin fill-white'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='#E5E7EB'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentColor'
                        />
                      </svg>
                    </div>
                  )}
                  {DataProductSearch?.data.data?.slice(0, 5).map((item) => (
                    <Fragment key={item._id}>
                      <Link
                        to={`${path.home}${item._id}`}
                        className='flex items-center justify-between py-2 px-2 duration-200 hover:bg-gray-200'
                        onClick={() =>
                          setIsShow((prevState) => {
                            setSearchText('')
                            return !prevState
                          })
                        }
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          width='64'
                          height='64'
                          className='h-16 w-16 object-cover'
                        />
                        <p className='fs-12 ml-1 line-clamp-2 dark:text-black'>{item.name}</p>
                        <div className='fs-12 dark:text-black'>{formatCurrency(item.price)}đ</div>
                      </Link>
                    </Fragment>
                  ))}
                  {!isLoading && !DataProductSearch?.data.data.length && (
                    <div className='flex h-20 items-center justify-center font-semibold'>
                      <span>Product is not found</span>
                    </div>
                  )}
                </div>
              </div>
            </form>

            <Popover
              className='flex h-10 cursor-pointer flex-col justify-center rounded-8 border border-gray-400 px-2 duration-200 hover:border-primary-377DFF'
              renderPopover={
                <div className='max-h-[439px] overflow-hidden rounded-4 border border-gray-200 bg-white shadow-md'>
                  <div className='fs-14 flex  w-72 flex-col items-start md:w-[400px] '>
                    {ProductDataCart && ProductDataCart.length > 0 ? (
                      <Fragment>
                        <div className='flex w-full items-center justify-between border-b border-gray-200 py-2 px-4'>
                          <p className='font-semibold'>New Products Added</p>
                          <Link
                            to={path.cart}
                            className='font-semibold text-primary-377DFF hover:text-secondary-1D6AF9'
                          >
                            <span>View cart</span>
                          </Link>
                        </div>
                        {ProductDataCart.map((item) => (
                          <Fragment key={item._id}>
                            <Link
                              to=''
                              className='flex w-full items-center justify-between py-2 px-4 duration-200 hover:bg-gray-200'
                            >
                              <div className='flex items-center gap-2'>
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  width='64'
                                  height='64'
                                  className='h-16 w-16 object-cover'
                                />
                                <span className='line-clamp-1'>{item.product.name}</span>
                              </div>
                              <span className='text-red-500'>{formatCurrency(item.price)}</span>
                            </Link>
                          </Fragment>
                        ))}
                      </Fragment>
                    ) : (
                      <div className='w-full'>
                        <div className='flex w-full items-center justify-between border-b border-gray-200 py-2 px-4'>
                          <p className='font-semibold'>New Products Added</p>
                          <Link
                            to={path.cart}
                            className='font-semibold text-primary-377DFF hover:text-secondary-1D6AF9'
                          >
                            <span>View cart</span>
                          </Link>
                        </div>
                        <p className='py-4 text-center font-semibold'>Cart empty</p>
                      </div>
                    )}
                  </div>
                </div>
              }
            >
              <div className='relative flex h-full flex-col justify-center'>
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
                  <span className='fs-14 absolute -right-4 -top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-white p-3 font-semibold text-primary-377DFF'>
                    {ProductDataCart.length}
                  </span>
                )}
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
