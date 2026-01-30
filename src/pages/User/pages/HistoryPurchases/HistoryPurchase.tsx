import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import { path } from 'src/contexts/path'
import { purchasesStatus } from 'src/contexts/purchases'
import useQueryParams from 'src/hooks/useQueryParams'
import type { PurchasesListStatus } from 'src/types/purchases.type'
import { formatInitCurrency, genarateNameID } from 'src/utils/utils'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.SPWait, name: 'Chờ xác nhận' },
  { status: purchasesStatus.SPGetTing, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.SPProgress, name: 'Đang giao' },
  { status: purchasesStatus.SPDelivered, name: 'Đã giao' },
  { status: purchasesStatus.SPcancel, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data: purchasesData } = useQuery({
    queryKey: ['purchases', { status }],

    queryFn: () => purchasesApi.getPurchases({ status: status as PurchasesListStatus })
  })
  const purchasesInCart = purchasesData?.data.data
  return (
    <div>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
        {purchaseTabs.map((tab) => (
          <Link
            key={tab.status}
            to={{
              pathname: path.historypurchase,
              search: createSearchParams({
                status: String(tab.status)
              }).toString()
            }}
            className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
              'border-b-orange text-orange': status === tab.status,
              'border-b-gray-600 text-gray-600': status !== tab.status
            })}
          >
            {tab.name}
          </Link>
        ))}
      </div>
      <div>
        {purchasesInCart?.map((purchase) => (
          <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-600 shadow-sm'>
            <Link
              to={`${path.home}${genarateNameID({ name: purchase.product.name, id: purchase.product._id })}`}
              className='flex'
            >
              <div className='flex-shrink-0'>
                <img className='h-20 w-20' src={purchase.product.image} alt={purchase.product.name} />
              </div>

              <div className='ml-3 flex-grow overflow-hidden'>
                <div className='truncate'>{purchase.product.name}</div>
                <div className='mt-2'>x{purchase.buy_count}</div>
              </div>

              <div className='ml-3 flex-shrink-0'>
                <span className='truncate line-through'>
                  đ{formatInitCurrency(purchase.product.price_before_discount)}
                </span>
                <span className='ml-2 text-orange'>đ{formatInitCurrency(purchase.product.price)}</span>
              </div>
            </Link>
            <div
              className='flex justify-end items-center
            '
            >
              <span>Tổng số tiền:</span>
              <div className='text-orange ml-3 text-xl'>
                đ{formatInitCurrency(purchase.product.price_before_discount * purchase.buy_count)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
