import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layout/registerLayout'
import MainLayout from './layout/MainLayout'

import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './contexts/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import UserLayout from './pages/User/Layout/UserLayout'
import ChangePassWord from './pages/User/pages/changepassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchases'
import Profile from './pages/User/pages/Profile'
import CartLayout from './layout/CartLayout'

//tạo cái component để kiểm tra người dùng login chưa

// eslint-disable-next-line react-refresh/only-export-components
function ProtecdRouter() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  //nghĩa là nêu login rồi là true thi outlet(tiếp tục vào) ngược kaij thì tới trang login
}

//người dùng login r ko cho vào lại trang login nữa login ban đầu là false
// eslint-disable-next-line react-refresh/only-export-components
function RejectedRouter() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  //nghĩa là nêu login rồi là true thi outlet(tiếp tục vào) ngược lại thì tới trang login
}

export default function useRouteElements() {
  //bảng chất thằng này là theo kiểu trên xuống dưới nên dể lỗi ko mong muốn
  const routeElements = useRoutes([
    {
      index: true, //nhận diện đây thz chính xếp ở đâu cx được
      path: '/', // đường dẫn gốc
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
      // danh sách sản phẩm
    },
    {
      path: '/',
      element: <ProtecdRouter />,
      children: [
        // {
        //   path: path.profile,
        //   element: (
        //     <MainLayout>
        //       <Profile />
        //     </MainLayout>
        //   )
        // },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.productDetail,
          element: (
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changepassword,
              element: <ChangePassWord />
            },
            {
              path: path.historypurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },

    {
      path: '',
      element: <RejectedRouter />, //muốn vào ông con bước qua ông cha
      children: [
        {
          // path: '/auth/signIn', // đường dẫn đăng nhập
          path: path.login, // đường dẫn đăng nhập
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register', // đường dẫn đăng ký
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
