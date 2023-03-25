import Product from 'src/components/Product'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'

export default function ProductList() {
  return (
    <>
      <div className='grid grid-cols-1 gap-5 mmd:grid-cols-12 lg:gap-6'>
        <div className='mmd:col-span-3'>
          <AsideFilter />
        </div>
        <div className='mmd:col-span-9'>
          <SortProductList />
          <div className='mt-5 grid grid-cols-1 gap-5 xsm:grid-cols-2 sm:grid-cols-3 lg:mt-6 lg:gap-6'>
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </div>
    </>
  )
}
