/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import { useEffect, useState } from 'react'

type WindowDimentions = {
  width: number | undefined
  height: number | undefined
}

const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: undefined,
    height: undefined
  })
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return (): void => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowDimensions
}

export default useWindowDimensions


// import useWindowDimensions from './useWindowDimensions';

// type DeviceType = 'mobile' | 'tablet' | 'desktop';

// const getDeviceType = (): DeviceType => {
//   const { width } = useWindowDimensions();
//   if (width && width < 768) {
//     // Thiết bị có chiều rộng nhỏ hơn 768px được xem là mobile
//     return 'mobile';
//   } else if (width && width < 992) {
//     // Thiết bị có chiều rộng từ 768px đến 991px được xem là tablet
//     return 'tablet';
//   } else {
//     // Thiết bị có chiều rộng lớn hơn hoặc bằng 992px được xem là desktop
//     return 'desktop';
//   }
// };

// export default getDeviceType;