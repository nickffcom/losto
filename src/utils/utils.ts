import axios, { AxiosError } from 'axios'
import { config } from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { DeviceType } from 'src/types/utils.type'
import userImage from 'src/assets/images/user.svg'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

//Handle error 422
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .toLocaleLowerCase()
}

export function calculateRateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const getDeviceType = (): DeviceType => {
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

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : userImage)
