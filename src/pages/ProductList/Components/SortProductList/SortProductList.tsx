/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { path } from 'src/contexts/path'
import { sort_By, order as orderConstantProduct } from 'src/contexts/products'
import type { ProductListConfig } from 'src/types/Product.type'
import { omit } from 'lodash'
import type { queryConfig } from 'src/hooks/useQueryConfig'
// import { number } from 'framer-motion'

interface Props {
  queryConfig: queryConfig
  pageSize: number
}

export default function SortProductList({ pageSize, queryConfig }: Props) {
  const { sort_by = sort_By.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
            //pagenumber là number mà createSearchParams có kiểu string | string [] nên phải ép kiểu pagenumber
            // và cái createSearchParams return về URLSearchParams nên phải ép sang string
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePrice = (sortByValue: Exclude<ProductListConfig['order'], undefined>) => {
    // console.log(sortByValue);
    //navigate có thể nhận 1 string hay obj
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sort_By.price, //hai cái key này không phải thích đặt tên nào đặt phải giống với api mẫu
        order: sortByValue
      }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3 '>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex gap-2 flex-wrap items-center'>
          <div>Sap Xep Theo</div>
          <button
            className={classNames(' h-8 px-4 capitalize  text-sm  text-center', {
              'bg-orange text-white hover:bg-orange/80 text-center ': isActiveSortBy(sort_By.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sort_By.view)
            })}
            onClick={() => handleSort(sort_By.view)}
          >
            Pho Bien
          </button>
          <button
            className={classNames(' h-8 px-4 capitalize  text-sm  text-center', {
              'bg-orange text-white hover:bg-orange/80 text-center ': isActiveSortBy(sort_By.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sort_By.createdAt)
            })}
            onClick={() => handleSort(sort_By.createdAt)}
          >
            Moi Nhat
          </button>
          <button
            className={classNames(' h-8 px-4 capitalize  text-sm  text-center', {
              'bg-orange text-white hover:bg-orange/80 text-center ': isActiveSortBy(sort_By.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sort_By.sold)
            })}
            onClick={() => handleSort(sort_By.sold)}
          >
            Ban Chay
          </button>

          <select
            // defaultValue=''
            className={classNames(' h-8 px-4 capitalize text-sm  text-left outline-none ', {
              'bg-orange text-white hover:bg-orange/80 text-center ': isActiveSortBy(sort_By.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sort_By.price)
            })}
            value={order || ''} //ko có order show giá
            onChange={(event) => handlePrice(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white y text-black'>
              Giá
            </option>
            <option value={orderConstantProduct.asc} className='bg-white y text-black'>
              Giá: thấp đến cao
            </option>
            <option value={orderConstantProduct.desc} className='bg-white y text-black'>
              Giá: cao đến thấp
            </option>
          </select>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 w-[100px] flex'>
            {page === 1 ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-8 h-8 p-2 rounded-tl-sm rounded-bl-sm bg-white/50 hover:bg-slate-100 cursor-not-allowed'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            ) : (
              <Link
                className='w-8 h-8 p-2 rounded-tl-sm rounded-bl-sm bg-white/50 hover:bg-slate-100 '
                to={{
                  pathname: path.home,
                  //vì queryconfig là đoạn obj cần chuyển đoạn string 'search' là 1 obj nên là dùng thz createSearchParams nó là 1 obj
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                    //pagenumber là number mà createSearchParams có kiểu string | string [] nên phải ép kiểu pagenumber
                    // và cái createSearchParams return về URLSearchParams nên phải ép sang string
                  }).toString()
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-8 h-8 p-2 rounded-tl-sm rounded-bl-sm bg-white/50 hover:bg-slate-100 cursor-not-allowed'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            ) : (
              <Link
                className='w-8 h-8 p-2 rounded-tl-sm rounded-bl-sm bg-white/50 hover:bg-slate-100 '
                to={{
                  pathname: path.home,
                  //vì queryconfig là đoạn obj cần chuyển đoạn string 'search' là 1 obj nên là dùng thz createSearchParams nó là 1 obj
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                    //pagenumber là number mà createSearchParams có kiểu string | string [] nên phải ép kiểu pagenumber
                    // và cái createSearchParams return về URLSearchParams nên phải ép sang string
                  }).toString()
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-4 h-4 rounded-tl-sm rounded-bl-sm bg-white/50 hover:bg-slate-100 '
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
