import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './Components/AsideFilter'
import ProductItem from './Components/ProductItem'
import SortProductList from './Components/SortProductList'
import productApi from 'src/apis/product.api'
import Paginate from 'src/components/Paginate'
import type { ProductListConfig } from 'src/types/Product.type'
import categoriesApi from 'src/apis/Categary.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function ProductList() {
  // const [page, setPage] = useState(1)
  //làm về phân trang

  const queryConfig = useQueryConfig()

  // console.log(queryConfig)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: ProductData } = useQuery({
    queryKey: ['products', queryConfig],
    //vì sao truyền queryprams trên query key vì khi url thay đổi chính là queryPrams nên mới nhạn biết  thì usequery mới chạy
    queryFn: () => {
      return productApi.getProduct(queryConfig as ProductListConfig)
    },
    staleTime: 3000 * 60,
    placeholderData: keepPreviousData

    //khi mình bấm trang khác thay vì từ undefind rồi load lại thì nó chỉ reset lại ko có cập nhập lạ đỡ giật
  })

  // console.log(data)
  // const productList = data?.data?.data?.product || []
  // const productList: Product[] = data?.data?.data?.products || []
  // console.log('data:', data)

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    //vì sao truyền queryprams trên query key vì khi url thay đổi chính là queryPrams nên mới nhạn biết  thì usequery mới chạy
    queryFn: () => {
      return categoriesApi.getCategories()
    }
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {ProductData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categaries={categoryData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={ProductData.data.data.pagination.page_size} />{' '}
              {/*vung tren ben phai */}
              {/*duoi ni la danh sach san pham */}
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {/*muon ni hien thi 30 san pham dung method Array js phai .fill cho gia tri thi moi map duoc (nho co key ko bao loi) */}
                {/* {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <ProductItem />
                  </div>
                ))} */}

                {ProductData?.data?.data?.products?.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <ProductItem product={product} />
                  </div>
                ))}
                {/* {productList.map((product: Product) => (
                <div className='col-span-1' key={product._id}>
                  <ProductItem product={product} />
                </div>
              ))} */}
              </div>
              <Paginate queryConfig={queryConfig} pageSize={ProductData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
