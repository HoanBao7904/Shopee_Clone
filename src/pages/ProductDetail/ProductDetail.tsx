import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import DOMPurify from 'dompurify'
import ProductRating from 'src/components/ProductRating'
import { formatInitCurrency, formatNumber, getIDFormNameid, rateSale } from 'src/utils/utils'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Product, ProductListConfig } from 'src/types/Product.type'
import ProductItem from '../ProductList/Components/ProductItem'
import QuantityController from 'src/components/QuantityController'
import purchasesApi from 'src/apis/purchases.api'
import { purchasesStatus } from 'src/contexts/purchases'
import { toast } from 'react-toastify'
import { path } from 'src/contexts/path'

export default function ProductDetail() {
  const [byCount, setByCount] = useState(1)
  const queryClient = useQueryClient()
  const { nameId } = useParams()
  const navigate = useNavigate()
  const id = getIDFormNameid(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  //ban đầu cho array từ 0 đến 5
  const [activeImage, setActiveImage] = useState('')
  const product = productDetailData?.data.data
  // console.log(product)

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  // console.log('queryConfig:', queryConfig)
  // console.log(queryConfig)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: ProductData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig)
    },
    staleTime: 3000 * 60,
    enabled: Boolean(product)
  })
  console.log('ProductData:', ProductData)
  const imagesRef = useRef<HTMLImageElement>(null)
  const currentImages = useMemo(
    () => (product ? product?.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )
  // const h = product?.images.slice(0, 5)
  // console.log(h)
  //dung usememo de han che khi render lai tinh lai

  const handleByCount = (value: number) => {
    setByCount(value)
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImages[1] < (product as Product)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.addtoCart(body)
  })

  //   {
  // mutationFn: (body) => {
  //   return purchasesApi.addtoCart(body)
  // }
  // }
  const addToCart = () => {
    addToCartMutation.mutate(
      {
        product_id: product?._id as string,
        buy_count: byCount
      },
      {
        onSuccess: () => {
          toast.success('thêm sản phẩm thành công')
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: purchasesStatus.inCart }]
          })
          // queryKey: ['purchases', { status: purchasesStatus.inCart }]
        }
      }
    )
  }

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    //lấy độ rộng cao của thẻ div chứa hình ảnh
    // console.log(rect)
    const image = imagesRef.current
    const { naturalHeight, naturalWidth } = image as HTMLImageElement
    // const { offsetX, offsetY } = event.nativeEvent
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.screenY)
    //cánh này ko cần css thẻ img pointer-events-none
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    if (!image) return
    image.style.maxWidth = 'unset'
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
    // image.style.height = naturalHeight + 'px'
    // console.log(offsetX, offsetY)

    //Event bubble
  }
  const handleRemoteZoom = () => {
    imagesRef.current?.removeAttribute('style')
  }

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({
      product_id: product?._id as string,
      buy_count: byCount
    })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  // console.log(product?.image)
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6 '>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className=' relative w-full pt-[100%] shadow-sm cursor-zoom-in overflow-hidden'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoteZoom}
              >
                {activeImage && (
                  <img
                    src={activeImage}
                    alt={product.name}
                    className='w-full h-full top-0 left-0 absolute object-cover bg-white'
                    //pointer-events-none thẻ img ko nhân sự kiện ko còn hiển dược giật
                    ref={imagesRef}
                  />
                )}
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-2'>
                <button
                  onClick={prev}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {/* {product.images.slice(0, 5).map((img, index) => { */}
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%] shadow' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='w-full h-full top-0 left-0 absolute object-cover bg-white cursor-pointer'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
                <button
                  onClick={next}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='txet-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center '>
                <div className='flex items-center'>
                  <span className='border-b-orange text-orange mr-1 border-b'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='w-4 h-4 fill-yellow-300 text-yellow-300'
                    nonActiveClassName='w-4 h-4 fill-gray-300 text-gray-300'
                  />
                </div>
                <div className='mx-4 w-[1px] h-4 bg-gray-500'></div>
                <div>
                  <span>{formatNumber(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{formatInitCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-2xl font-medium text-orange'>đ{formatInitCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] test-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='text-gray-500 capitalize'>số lượng</div>
                <QuantityController
                  onIncrease={handleByCount}
                  onDecrease={handleByCount}
                  onType={handleByCount}
                  value={byCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẳn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex justify-center items-center border border-orange rounded-sm bg-orange/10 px-5 h-12 text-orange
                shadow-sm hover:bg-orange/5 '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='ml-4 flex h-12 min-w[5rem] justify-center items-center px-2 rounded-sm
                 bg-orange text-white shadow-sm outline-none hover:bg-orange/70 capitalize'
                >
                  mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='mt-8 bg-Whte p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700 text-left'>mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div
              className='text-left'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-black text-left text-2xl'>Có thể bạn thích</div>
          {ProductData && (
            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
              {ProductData?.data?.data?.products?.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
