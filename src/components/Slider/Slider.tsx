import SwiperCore, { Pagination, Navigation, Autoplay, EffectCreative } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Pagination, Navigation, Autoplay])

const Slider = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      navigation
      modules={[Navigation]}
      loop
      className='swiper-home'
    >
      <SwiperSlide>
        <div className='relative'>
          <img
            src='https://ik.imagekit.io/fh01eqtgh/Banner/phono-slider-2.jpg?updatedAt=1679906842999'
            alt='SmartPhone'
            width='1920'
            height='940'
          />
          <div className='absolute top-1/4 hidden max-w-screen-sm text-center xsm:translate-x-1/4 md:block'>
            <p className='fs-30'>4K Resolution</p>
            <h2 className='text-7xl'>Exclusive Steel Frame</h2>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative'>
          <img
            src='https://ik.imagekit.io/fh01eqtgh/Banner/phono-slider-1.jpg?updatedAt=1679906843020'
            alt='SmartPhone'
            width='1920'
            height='940'
          />
          <div className='absolute top-1/4 hidden max-w-screen-sm text-center xsm:translate-x-1/4 md:block'>
            <p className='fs-30'>Zania Black Edition</p>
            <h2 className='text-7xl'>Curvy Bevel Dual Audio</h2>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative'>
          <img
            src='https://ik.imagekit.io/fh01eqtgh/Banner/phono-slider-3.jpg?updatedAt=1679906842969'
            alt='SmartPhone'
            width='1920'
            height='940'
          />
          <div className='absolute top-1/4 hidden max-w-screen-sm text-center xsm:translate-x-1/4 md:block'>
            <p className='fs-30'>Delta Zertiga Processor</p>
            <h2 className='text-7xl'>Full Screen Display</h2>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default Slider
