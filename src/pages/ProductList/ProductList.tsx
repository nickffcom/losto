import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import productApi from 'src/apis/product.api'
import Product from 'src/components/Product'
import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })
  console.log('data', data)

  return (
    <>
      <div className='grid grid-cols-1 gap-5 mmd:grid-cols-12 lg:gap-6'>
        <div className='mmd:col-span-3'>
          <AsideFilter />
        </div>
        <div className='mmd:col-span-9'>
          <SortProductList />
          <div className='mt-5 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:mt-6 lg:gap-6'>
            {data &&
              data.data.data.products.map((product) => (
                <Fragment key={product._id}>
                  <Product product={product} />
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
