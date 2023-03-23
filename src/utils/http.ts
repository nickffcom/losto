import axios, { type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { AuthResponse } from 'src/types/auth.type'
import { clearAccesTokenFromLS, getAccessTokenFromLS, saveAccesTokenToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    //bien accessToken goi tren ram nhanh hon khi goi trong file nen dat vao contructor
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-lotso-ecommerce.onrender.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    //Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthResponse).data.access_token
          saveAccesTokenToLS(this.accessToken)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearAccesTokenFromLS()
        }
        return response
      },
      function (error) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const message = error.response?.data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
