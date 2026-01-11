import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm, type RegisterOptions } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authAPi from 'src/apis/auth.api'
import Button from 'src/button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import type { ErrorResponseApi } from 'src/types/utils.type'
import { rules } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

interface FormData {
  email: string
  password: string
}
export default function Login() {
  const { SetIsAuthenticated, setProfile } = useContext(AppContext)
  const navigator = useNavigate()

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    setError,
    register, // đăng ký input với react-hook-form
    handleSubmit, // xử lý submit form
    // getValues, // lấy giá trị của form
    formState: { errors } // trạng thái của form
  } = useForm<FormData>()

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authAPi.loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    // console.log(data)

    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        // console.log(data)
        SetIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigator('/')

        toast.success('đăng nhập thành công')
        // localStorage.setItem('access_token', data.data?.data?.access_token)
        // Nếu muốn chuyển hướng sang trang đăng nhập hoặc trang chủ
        // navigate('/login') // hoặc navigate('/') tùy logic của bs
        // toast.success('Đăng ký tài khoản thành công!')
      },
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(errors)) {
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

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              {/* <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'></div>
              </div> */}
              <Input
                name='email'
                register={register}
                rules={rules.email}
                type='input'
                className='mt-8'
                placeholder='Email'
                errorMassage={errors.email?.message}
              />

              <div className='mt-3'>
                <input
                  type='password'
                  // name='password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='password'
                  {...register('password', rules.password as RegisterOptions<FormData, 'password'>)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div>

              <div className='mt3'>
                <Button
                  type='submit'
                  isLoding={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-slate-50 text-sm hover:bg-red-600'
                >
                  Đăng Nhập
                </Button>
              </div>

              <div className='mt-8 '>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-500'>Bạn chưa có tài khoản chưa? </span>
                  <Link to='/register' className='text-red-400 ml-1'>
                    Đăng Ký
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
