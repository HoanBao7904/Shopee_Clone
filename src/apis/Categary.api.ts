import type { Category } from 'src/types/Category.type'
import type { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'categories'

const categoriesApi = {
  getCategories() {
    return http.get<SuccessResponseApi<Category[]>>(URL)
  }
}
//qua productList gọi getCategories
export default categoriesApi
