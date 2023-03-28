import classNames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import InputNumber from 'src/components/InputNumber'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../ProductList'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStar from 'src/components/RatingStar'
import Button from 'src/components/Button'
import { omit } from 'lodash'
interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.productlist,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    reset()
    navigate({
      pathname: path.productlist,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  return (
    <div className='rounded-8 px-3 py-2 dark:bg-white lg:p-4'>
      <Link
        to={path.home}
        title='All Categories'
        className='fs-18 flex items-center gap-2 border-b border-black pb-2 font-semibold uppercase text-black'
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
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
        <span>All Categories</span>
      </Link>
      <ul className='mt-3 list-disc pl-4'>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li
              key={categoryItem._id}
              className={classNames(
                'fs-14 py-1 font-medium text-black duration-200 md:fs-16 hover:text-primary-377DFF md:py-2',
                {
                  'text-primary-377DFF': isActive
                }
              )}
            >
              <Link
                to={{
                  pathname: path.productlist,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                title='Smart Phone'
              >
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='fs-18 mt-3 flex items-center gap-2 border-b border-black pb-2 font-semibold uppercase text-black'>
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
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>

        <span>Filters</span>
      </div>
      <p className='fs-14 mt-3 font-medium text-black'>Price Range</p>
      <form className='mt-2' onSubmit={onSubmit}>
        <div className='flex items-start'>
          <Controller
            control={control}
            name='price_min'
            render={({ field }) => {
              return (
                <InputNumber
                  className='grow'
                  classNameInput='w-full rounded-8 border border-gray-900 bg-white py-2 px-3 outline-none bg-white placeholder:fs-14 placeholder:capitalize'
                  placeholder='From'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                  classNameError='hidden'
                />
              )
            }}
          />
          <div className='mx-2 mt-2 shrink-0'>-</div>
          <Controller
            control={control}
            name='price_max'
            render={({ field }) => {
              return (
                <InputNumber
                  className='grow'
                  classNameInput='w-full rounded-8 border border-gray-900 bg-white py-2 px-3 outline-none bg-white placeholder:fs-14 placeholder:capitalize'
                  placeholder='To'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                  classNameError='hidden'
                />
              )
            }}
          />
        </div>
        <div className='fs-12 mt-1 min-h-[1.2rem] text-center text-red-600'>{errors.price_min?.message}</div>
        <Button type='submit' className='button-primary w-full before:w-[350px]'>
          <span>Apply</span>
        </Button>
      </form>
      <p className='fs-14 mt-3 font-medium text-black'>Feedback</p>
      <RatingStar queryConfig={queryConfig} />
      <Button onClick={handleRemoveAll} className='button-secondary w-full  before:w-[350px] hover:text-black'>
        Xóa tất cả
      </Button>
    </div>
  )
}
