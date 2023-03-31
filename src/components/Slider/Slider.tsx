import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import SwiperCore, { Navigation, Autoplay, EffectCreative, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'

SwiperCore.use([Navigation, Autoplay, EffectCreative, FreeMode])

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiper, setSwiper] = useState<SwiperCore | null>(null)

  const handleSlideChangeStart = useCallback(() => {
    setActiveIndex(-1)
  }, [])

  const handleSlideChangeEnd = useCallback(() => {
    setActiveIndex(swiper?.realIndex ?? 0)
  }, [swiper])

  return (
    <div className=''>
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
          delay: 5000,
          disableOnInteraction: false
        }}
        loop
        modules={[Navigation, EffectCreative, Autoplay]}
        onSlideChangeTransitionStart={handleSlideChangeStart}
        onSlideChangeTransitionEnd={handleSlideChangeEnd}
        onSwiper={setSwiper}
      >
        <SwiperSlide>
          <div className='relative'>
            <img
              src='https://ik.imagekit.io/fh01eqtgh/Banner/phono-slider-2.jpg?updatedAt=1679906842999'
              alt='SmartPhone'
              width='1920'
              height='940'
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className='absolute top-0 left-0 bottom-0 right-0 hidden md:block'
            >
              <div className='flex h-full items-center justify-around'>
                <div className='text-center'>
                  <p className='fs-30'>4K Resolution</p>
                  <h2 className='mt-2 text-4xl'>Exclusive Steel Frame</h2>
                  <Link to={path.productlist} title='Shop Now'>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className='button-primary mt-5 inline-block'
                    >
                      Shop Now
                    </motion.div>
                  </Link>
                </div>
                <div></div>
              </div>
            </motion.div>
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
            <motion.div
              className='absolute top-0 left-0 bottom-0 right-0 hidden md:block'
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === 1 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className='flex h-full items-center justify-around'>
                <div></div>
                <div className='text-center text-white'>
                  <p className='fs-30'>Curvy Bevel Dual Audio</p>
                  <h2 className='mt-2 text-4xl'>Zania Black Edition</h2>
                  <Link to={path.productlist} title='Shop Now'>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className='button-primary mt-5 inline-block'
                    >
                      Shop Now
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
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
            <motion.div
              className='absolute top-0 left-0 bottom-0 right-0 hidden md:block'
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === 2 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className='flex h-full items-center justify-around'>
                <div></div>
                <div className='text-center text-white'>
                  <p className='fs-30'>Delta Zertiga Processor</p>
                  <h2 className='mt-2 text-4xl'>Full Screen Display</h2>
                  <Link to={path.productlist} title='Shop Now'>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className='button-primary mt-5 inline-block'
                    >
                      Shop Now
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slider
