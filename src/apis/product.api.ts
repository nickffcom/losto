import { ProductList, ProductListConfig, Product } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  },
  searchProduct(searchText: string) {
    return http.get<SuccessResponse<Product[]>>(`${URL}/searchs?searchText=${searchText}`)
  }
}

export default productApi
