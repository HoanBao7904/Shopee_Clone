import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import Button from 'src/button'
import QuantityController from 'src/components/QuantityController'
import { path } from 'src/contexts/path'
import { purchasesStatus } from 'src/contexts/purchases'
import type { Purchases } from 'src/types/purchases.type'
import { formatInitCurrency, genarateNameID } from 'src/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'

interface ExtendedPurchases extends Purchases {
  disable: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchses, setExtendedPurchses] = useState<ExtendedPurchases[]>([])
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updateMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.updatePurchasee(body),
    onSuccess: () => {
      refetch()
    }
  })
  const purchasesInCart = purchasesInCartData?.data.data
  // console.log(purchasesInCart)
  const isAllchecked = extendedPurchses.every((puchase) => puchase.checked)

  //gọi api xong setstate
  useEffect(() => {
    setExtendedPurchses((prev) => {
      const extendedPurchasesObj = keyBy(prev, '_id')
      // console.log(extendedPurchasesObj)
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disable: false,
          checked: Boolean(extendedPurchasesObj[purchase._id]?.checked)
        })) || []
      )
    })
  }, [purchasesInCart])

  // cú pháp này là cú pháp curried function
  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchses(
      produce((draft) => {
        //dòng này nghĩa là lấy cái mảng hiện tại ra để thao tác
        draft[purchaseIndex].checked = event.target.checked
        // console.log(draft[productIndex].checked)
      })
    )
  }
  const handleAllChecked = () => {
    setExtendedPurchses((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllchecked
      }))
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchses[purchaseIndex]
      // console.log(purchase)
      setExtendedPurchses(
        produce((draft) => {
          console.log(draft[purchaseIndex].disable)
          draft[purchaseIndex].disable = true
        })
      )
      updateMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchses(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm text-gray-500 bg-white px-9 py-5 text-sm capitalize shadow'>
              <div className='col-span-6'>
                <div className=' flex items-center'>
                  <div className=' flex items-center flex-shrink-0 justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllchecked}
                      onChange={handleAllChecked}
                    />
                  </div>
                  <div className='flex-grow text-black'>sản phẩm </div>
                </div>
              </div>

              <div className='col-span-6'>
                <div className='grid text-center grid-cols-5'>
                  <div className='col-span-2'>đơn giá</div>
                  <div className='col-span-1'>số lượng</div>
                  <div className='col-span-1'>số tiền</div>
                  <div className='col-span-1'>thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchses?.map((purchase, index) => (
                <div
                  className='grid grid-cols-12 rounded-sm text-center border border-gray-200 text-sm text-gray-500 mb-[10px] p-[10px]'
                  key={purchase._id}
                >
                  <div className='col-span-6'>
                    <div className=' flex '>
                      <div className=' flex items-center flex-shrink-0 justify-center pr-3 pl-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={purchase.checked}
                          onChange={handleChecked(index)}
                        />
                      </div>
                      <div className='flex-grow '>
                        <div className='flex'>
                          <Link
                            to={`${path.home} ${genarateNameID({ name: purchase.product.name, id: purchase.product._id })}`}
                            className='h-20 w-20 flex-shrink-0'
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2 text-left line-clamp-2'>
                            <Link
                              to={`${path.home} ${genarateNameID({ name: purchase.product.name, id: purchase.product._id })}`}
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6 '>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            đ{formatInitCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='text-gray-400 ml-3'>đ{formatInitCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                          onDecrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                          onIncrease={(value) => handleQuantity(index, value, value >= 1)}
                          disabled={purchase.disable}
                          onFocusOut={(value) => {
                            // console.log(value, purchase.buy_count, value !== purchase.buy_count)
                            handleQuantity(
                              index,
                              value,
                              value <= purchase.product.quantity &&
                                value >= 1 &&
                                value !== (purchasesInCart as Purchases[])[index].buy_count
                            )
                            // console.log(value, purchase.buy_count, value !== purchase.buy_count)
                          }}
                          onType={handleTypeQuantity(index)}
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          {formatInitCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <div className='bg-none text-black hover:text-orange cursor-pointer'>Xóa</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 flex items-center rounded-sm bg-white p-5 shadow border-gray-300'>
          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
            <input
              type='checkbox'
              className='h-5 w-5 accent-orange'
              checked={isAllchecked}
              onChange={handleAllChecked}
            />
          </div>
          <button className='mx-3 border-none bg-none' onClick={handleAllChecked}>
            chọn tất cả
          </button>
          <button className='mx-3 border-none bg-none'>xóa</button>
          <div className='ml-auto flex items-center'>
            <div className=''>
              <div className='flex items-center justify-end'>
                <div>Tổng thanh toán(s sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>đ138.000</div>
              </div>
              <div className='flex items-center justify-end test-sm'>
                <div className='text-gray-500'>tiết kiệm</div>
                <div className='text-orange ml-6'>đ138.000</div>
              </div>
            </div>
            <Button className='bg-orange ml-4 flex justify-center items-center rounded-sm h-10 w-52 text-sm uppercase text-white hover:bg-red-600'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
