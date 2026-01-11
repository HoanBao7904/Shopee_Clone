import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authAPi from 'src/apis/auth.api'
import Input from 'src/components/Input'
import type { ErrorResponseApi } from 'src/types/utils.type'
import { rules } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/button'

interface FormData {
  email: string
  password: string
  confirm_password: string
}
/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Register() {
  const { SetIsAuthenticated, setProfile } = useContext(AppContext)
  const navigator = useNavigate()

  const {
    register,
    handleSubmit,
    getValues, // lấy giá trị của form
    watch, // theo dõi sự thay đổi của input
    setError,
    formState: { errors }
  } = useForm<FormData>()

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authAPi.registerAccount(body)
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    // console.log(data)

    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        SetIsAuthenticated(false)
        setProfile(data.data.data.user)
        navigate('/login')

        // localStorage.setItem('access_token', data.data?.data?.access_token)

        // Nếu muốn chuyển hướng sang trang đăng nhập hoặc trang chủ
        // navigate('/login') // hoặc navigate('/') tùy logic của bs
        toast.success('Đăng ký tài khoản thành công!')
      },
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(errors)) {
          const formErrors = errors.response?.data.data
          if (formErrors?.email) {
            setError('email', {
              message: formErrors.email,
              type: 'Server'
            })
          }
          if (formErrors?.password) {
            setError('password', {
              message: formErrors.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  // console.log('errors', errors)
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              {/* // noValidate để tắt trình duyệt tự validate */}
              <div className='text-2xl'>Đăng Ký</div>
              {/* <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  // {...register('email', {
                  //   required: {
                  //     value: true,
                  //     message: 'Email không được để trống'
                  //   }, // bắt buộc phải nhập
                  //   pattern: {
                  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //     message: 'Định dạng email không đúng'
                  //   } // regex kiểm tra định dạng email
                  // })}
                  {...register('email', rules.email as RegisterOptions<FormData, 'email'>)}
                />

                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div> */}
              <Input
                name='email'
                register={register}
                rules={rules.email}
                type='email'
                className='mt-8'
                placeholder='Email'
                errorMassage={errors.email?.message}
              />

              {/* <div className='mt-2'>
                <input
                  type='password'
                  // name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='password'
                  autoComplete='on'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div> */}
              <Input
                register={register}
                type='password'
                placeholder='PassWord'
                errorMassage={errors.password?.message}
                name='password'
                rules={rules.password}
                className='mt-2'
                autoComplete='on'
              />

              {/* <div className='mt-2'>
                <input
                  type='password'
                  // name='confirm_password' vì
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Confirm password'
                  autoComplete='on' // giúp trình duyệt gợi ý mật khẩu đã lưu
                  {...register('confirm_password', {
                    ...rules.confirmPassword,
                    validate: (value) => {
                      if (value === getValues('password')) { //getValues('password') password là tên của input password
                        return true
                      }
                      return 'Mật khẩu không khớp'
                    }
                  })}
                />

                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div> */}
              <Input
                register={register}
                rules={{
                  ...rules.confirmPassword,
                  validate: (value) => {
                    if (value === getValues('password')) {
                      return true
                    }
                    return 'Mật khẩu không khớp'
                  }
                }}
                name='confirm_password'
                className='mt-2'
                autoComplete='on'
                errorMassage={errors.confirm_password?.message}
                placeholder='Confirm password'
                type='password'
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  isLoding={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-slate-50 text-sm hover:bg-red-600'
                >
                  Đăng ký
                </Button>
              </div>

              <div className='mt-8 '>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-500'>Bạn đã có tài khoản chưa? </span>
                  <Link to='/login' className='text-red-400 ml-1'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
