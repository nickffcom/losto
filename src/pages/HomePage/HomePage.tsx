import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Product from 'src/components/Product'
import Slider from 'src/components/Slider'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'

export default function HomePage() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })
  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return categoryApi.getCategories()
  //   },
  //   staleTime: 3 * 60 * 1000
  // })
  // console.log(productsData)

  return (
    <>
      <Slider />
      <div className='container mt-10'>
        <h2 className='fs-18 mt-5 font-bold text-primary-377DFF lg:fs-30 lg:mt-10'>New Products</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation, Pagination]}
          className='new-product-slider'
          loop
          breakpoints={{
            768: {
              slidesPerView: 3
            }
          }}
        >
          {productsData?.data.data.products.splice(0, 12).map((item) => (
            <SwiperSlide key={item._id}>
              <div className='p-4'>
                <Product product={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
