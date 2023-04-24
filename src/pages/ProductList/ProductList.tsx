import { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import Product from 'src/components/Product'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='container mx-auto mt-4 flex flex-col items-center justify-center xsm:mt-7'>
      <Helmet>
        <title>Product List | Lotso Shop</title>
        <meta
          name='description'
          content="At Lotso Shop, we offer a wide range of high-quality products to suit all your shopping needs. Our product list includes everything from electronics and home appliances to fashion and beauty products, all at competitive prices. With easy-to-use filters and search options, you can easily find exactly what you're looking for and compare prices across our wide selection of brands. Start browsing our product list now and discover the best deals and discounts at Lotso Shop."
        />
      </Helmet>
      {productsData && (
        <div className='grid grid-cols-1 gap-5 mmd:grid-cols-12 lg:gap-6'>
          <div className='mmd:col-span-3'>
            <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
          </div>
          <div className='mmd:col-span-9'>
            <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            <div className='mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:mt-6 lg:gap-6'>
              {productsData.data.data.products.map((product) => (
                <Fragment key={product._id}>
                  <Product product={product} />
                </Fragment>
              ))}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
          </div>
        </div>
      )}
    </div>
  )
}
