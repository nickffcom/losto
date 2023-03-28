import useWindowDimensions from './useWindowDimensions'

type DeviceType = 'mobile' | 'tablet' | 'desktop'

const getDeviceType = (): DeviceType => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { width } = useWindowDimensions()
  if (width && width < 768) {
    // Thiết bị có chiều rộng nhỏ hơn 768px được xem là mobile
    return 'mobile'
  } else if (width && width < 992) {
    // Thiết bị có chiều rộng từ 768px đến 991px được xem là tablet
    return 'tablet'
  } else {
    // Thiết bị có chiều rộng lớn hơn hoặc bằng 992px được xem là desktop
    return 'desktop'
  }
}

export default getDeviceType
