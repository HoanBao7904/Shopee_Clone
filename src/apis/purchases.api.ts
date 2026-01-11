import type { Purchases, PurchasesListStatus } from 'src/types/purchases.type'
import type { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/purchases'

const purchasesApi = {
  addtoCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponseApi<Purchases>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchasesListStatus }) {
    return http.get<SuccessResponseApi<Purchases[]>>(`${URL}`, {
      // params:{
      //     status:
      // }
      params
    })
  },
  BuyProduct(body: { product_id: string; buy_count: number }[]) {
    //1 mảng các obj
    return http.post<SuccessResponseApi<Purchases[]>>(`${URL}/buy-products`, body)
  },
  updatePurchasee(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponseApi<Purchases[]>>(`${URL}/update-purchase`, body)
  },
  deletePurchases(purchaseID: string[]) {
    return http.delete<SuccessResponseApi<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseID
    })
  }
}

export default purchasesApi
