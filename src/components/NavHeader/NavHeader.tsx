import { useContext } from 'react'
import Popover from '../Popover'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import { path } from 'src/contexts/path'
import { useMutation } from '@tanstack/react-query'
import authAPi from 'src/apis/auth.api'
// import { getAvatarUrl } from 'src/utils/utils'
import Userimg from 'src/images/Userimg.svg'
import { getAvatarUrl } from 'src/utils/utils'
export default function NavHeader() {
  const { SetIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: authAPi.logoutAccount,
    onSuccess: () => {
      SetIsAuthenticated(false)
      setProfile(null)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex justify-end'>
      <Popover
        className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
        renderPopover={
          <div className='bg-white relative shadow-md rounded-sm border border-gray-200 min-w-[160px]'>
            <div className='flex flex-col'>
              <button className='py-3 px-4 hover:text-orange text-left text-gray-800 hover:bg-gray-50 transition-colors w-full text-sm'>
                Tiếng Việt
              </button>
              <button className='py-3 px-4 hover:text-orange text-left text-gray-800 hover:bg-gray-50 transition-colors w-full text-sm'>
                Tiếng Anh
              </button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
        </svg>
      </Popover>

      {isAuthenticated && (
        <Popover
          className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-4'
          renderPopover={
            <div>
              <Link
                to={path.profile}
                className='block py-2 px-3 hover:bg-slate-100 bg-white hover:text-cran-500 w-full hover:text-cyan-400 text-left'
              >
                Tài Khoản của tôi
              </Link>
              <Link
                to=''
                className='block py-2 px-3 hover:bg-slate-100 bg-white hover:text-cran-500 w-full hover:text-cyan-400 text-left'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block py-2 px-3 hover:bg-slate-100 bg-white hover:text-cran-500 w-full hover:text-cyan-400 text-left'
              >
                Đăng Xuất
              </button>
            </div>
          }
        >
          <div className='w-6 h-6 mr-2 flex-shrink-0'>
            <img
              src={getAvatarUrl(profile?.avatar) || Userimg}
              alt='avatar'
              className='w-full h-full object-cover rounded-full'
            />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
            Đăng Nhập
          </Link>
          <div className='border-r-[1px] border-r-white/40 h-4'></div>
          <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
            Đăng Ký
          </Link>
        </div>
      )}
    </div>
  )
}
