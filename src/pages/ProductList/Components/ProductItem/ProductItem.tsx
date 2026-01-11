import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { path } from 'src/contexts/path'

import type { Product } from 'src/types/Product.type'
import { formatInitCurrency, formatNumber, genarateNameID } from 'src/utils/utils'

interface Props {
  product: Product
}

export default function ProductItem({ product }: Props) {
  return (
    <Link to={`${path.home} ${genarateNameID({ name: product.name, id: product._id })}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full top-0 left-0 absolute object-cover bg-white'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w[50%] text-gray-500 truncate'>
              <span className='text-sm'>{formatInitCurrency(product.price_before_discount)}</span>
              <span className='text-sm'>Đ</span>
            </div>
            <div className='ml-2 text-orange truncate'>
              <span className='text-sm'>{formatInitCurrency(product.price)}</span>
              <span className='text-sm'>Đ</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-3 text-sm '>
              <span>{formatNumber(product.sold)}</span>
              <span> Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
