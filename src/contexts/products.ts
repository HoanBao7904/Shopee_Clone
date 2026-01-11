export const sort_By = {
  createdAt: 'createdAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
} as const //chỉ đọc được không ghi được

export const order = {
  asc: 'asc',
  desc: 'desc'
} as const
