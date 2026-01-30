import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/contexts/path'
import Userimg from 'src/images/Userimg.svg'
export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center py-4 border-b border-b-gray-200'>
        <div className='h-12 w-12 '>
          <Link
            to={path.profile}
            // className='h-full w-full flex-shrink-0 overflow-hidden rounded-full border border-black'
          >
            <img src={profile?.avatar || Userimg} alt='' className='h-full w-full rounded-full object-cover' />
          </Link>
        </div>

        <div className='flex-grow pl-4'>
          <div className='text-black mb-1 truncate text-left'>{profile?.name}</div>
          <NavLink
            to={path.profile}
            className={({ isActive }) =>
              classNames('flex items-center capitalize text-gray-500', {
                'text-orange': isActive,
                'text-gray-600': !isActive
              })
            }
          >
            Sửa hồ sơ
          </NavLink>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center capitalize text-black hover:text-orange transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='h-[22px] w-[22px] mr-3'>
            <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          <div>tài khoản của tôi</div>
        </NavLink>

        <NavLink
          to={path.changepassword}
          className={({ isActive }) =>
            classNames('flex items-center capitalize text-black hover:text-orange transition-colors mt-4', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='h-[22px] w-[22px] mr-3'>
            <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          <div>đổi mật khẩu</div>
        </NavLink>

        <NavLink
          to={path.historypurchase}
          className={({ isActive }) =>
            classNames('flex items-center capitalize text-black hover:text-orange transition-colors mt-4', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='h-[22px] w-[22px] mr-3'>
            <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          <div>Đơn mua</div>
        </NavLink>
      </div>
    </div>
  )
}
