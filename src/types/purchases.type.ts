import type { Product } from './Product.type'

export type PurchasesStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchasesListStatus = PurchasesStatus | 0

export interface Purchases {
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  _id: string
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}

// Thông tin `status`:
// -1: Sản phẩm đang trong giỏ hàng
// 0: Tất cả sản phâm
// 1: Sản phẩm đang đợi xác nhận từ chủ shop
// 2: Sản phẩm đang được lấy hàng
// 3: Sản phẩm đang vận chuyển
// 4: San phẩm đã được giao
// 5: Sản phẩm đã bị hủy
