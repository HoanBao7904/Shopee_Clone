import type { ProductListConfig } from 'src/types/Product.type'
import useQueryParams from './useQueryParams'
import { isUndefined, omitBy } from 'lodash'

export type queryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryPrams: queryConfig = useQueryParams() //lấy url lun là string
  const queryConfig: queryConfig = omitBy(
    {
      //thz omitby ai undefined thì nó ko lấy
      page: queryPrams.page || '1',
      limit: queryPrams.limit || '10', //hiển thị số items
      sort_by: queryPrams.sort_by,
      name: queryPrams.name,
      exclude: queryPrams.exclude,
      price_max: queryPrams.price_max,
      price_min: queryPrams.price_min,
      rating_filter: queryPrams.rating_filter,
      order: queryPrams.order,
      category: queryPrams.category
    },
    isUndefined
  )
  return queryConfig
}
