import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/contexts/path'
import Userimg from 'src/images/Userimg.svg'
export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center py-4 border-b border-b-gray-200'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black'>
          <img src={profile?.avatar || Userimg} alt='' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='text-black mb-1 truncate text-left'>{profile?.name}</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center capitalize text-black hover:text-orange transition-colors'>
          <div className='h-[22px] w-[22px] mr-3'>
            <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          <div>tài khoản của tôi</div>
        </Link>

        <Link
          to={path.changepassword}
          className='flex items-center capitalize text-black hover:text-orange transition-colors mt-4'
        >
          <div className='h-[22px] w-[22px] mr-3'>
            <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          <div>đổi mật khẩu</div>
        </Link>

        <Link
          to={path.historypurchase}
          className='flex items-center capitalize text-black hover:text-orange transition-colors mt-4'
        >
          <div className='h-[22px] w-[22px] mr-3'>
            <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          <div>Đơn mua</div>
        </Link>
      </div>
    </div>
  )
}
