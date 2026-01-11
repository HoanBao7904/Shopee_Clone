import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import { path } from 'src/contexts/path'
import type { queryConfig } from 'src/hooks/useQueryConfig'
// import type { queryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
  queryConfig: queryConfig
  pageSize: number
}
const RANGGE = 2 //phạm vi của trang so với trang hiện tại = 2
export default function Paginate({ pageSize, queryConfig }: Props) {
  let doAfter = false
  let doBefore = false

  const page = Number(queryConfig.page)

  const pagiNation = () => {
    const renderDoBefor = (index: number) => {
      if (!doBefore) {
        doBefore = true
        return (
          <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer' key={index}>
            ...
          </span>
        )
      }
      return null
    }

    const renderDoAfter = (index: number) => {
      if (!doAfter) {
        doAfter = true
        return (
          <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer' key={index}>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGGE * 2 + 1 && pageNumber > page + RANGGE && pageNumber < pageSize - RANGGE + 1) {
          return renderDoAfter(index)
        } else if (page > RANGGE * 2 + 1 && page < pageSize - RANGGE * 2) {
          if (pageNumber < page - 2 && pageNumber > RANGGE) {
            return renderDoBefor(index)
          } else if (pageNumber > page + 2 && pageNumber < pageSize - RANGGE + 1) {
            return renderDoAfter(index)
          }
        } else if (page >= pageSize - RANGGE * 2 && pageNumber > RANGGE && pageNumber < page - RANGGE) {
          return renderDoBefor(index)
        }

        return (
          <Link
            to={{
              pathname: path.home,
              //vì queryconfig là đoạn obj cần chuyển đoạn string 'search' là 1 obj nên là dùng thz createSearchParams nó là 1 obj
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
                //pagenumber là number mà createSearchParams có kiểu string | string [] nên phải ép kiểu pagenumber
                // và cái createSearchParams return về URLSearchParams nên phải ép sang string
              }).toString()
            }}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-cyan-400': page === pageNumber,
              'border-transparent': page !== pageNumber
            })}
            key={index}
            // onClick={() => setPage(pageNumber)} ban đầu dùng button
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border'>Prev</span>
      ) : (
        <Link
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
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Prev
        </Link>
      )}

      {pagiNation()}

      {page === pageSize ? (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border'>Next</span>
      ) : (
        <Link
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
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Next
        </Link>
      )}
    </div>
  )
}
