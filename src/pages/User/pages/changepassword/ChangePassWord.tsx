import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userAPI from 'src/apis/user.api'
import Button from 'src/button'
import Input from 'src/components/Input'
import type { ErrorResponseApi } from 'src/types/utils.type'
import { userSchema, type UserSchemaType } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
type FormData = Pick<UserSchemaType, 'password' | 'confirm_password' | 'new_password'>
const passWordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassWord() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    resolver: yupResolver(passWordSchema)
  })

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile
  })

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data)
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))

      toast.success(res.data.message)
    } catch (error) {
      // console.log(error)
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: String(formError[key as keyof FormData]),
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b border-b-gray-400 py-5'>
        <h1 className='text-lg font-medium text-black capitalize'>Đổi mật khẩu</h1>
        <div className='text-sm text-gray-300 mt-1'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>

      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow pr-12 md:mt:0'>
          <div className='flex flex-wrap mt-6'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu cũ</div>
            <div className='w-[80%] pl-5'>
              <Input
                className='relative'
                classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                register={register}
                errorMassage={errors.password?.message}
                placeholder='Mật khẩu cũ'
                type='password'
                name='password'
              />
            </div>
          </div>

          <div className='flex flex-wrap mt-6'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu mới</div>
            <div className='w-[80%] pl-5'>
              <Input
                className='relative'
                classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                register={register}
                errorMassage={errors.new_password?.message}
                placeholder='Mật khẩu mới'
                type='password'
                name='new_password'
              />
            </div>
          </div>

          <div className='flex flex-wrap mt-6'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu mới</div>
            <div className='w-[80%] pl-5'>
              <Input
                className='relative'
                classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                register={register}
                errorMassage={errors.confirm_password?.message}
                placeholder='Nhập lại mật khẩu mới'
                type='password'
                name='confirm_password'
              />
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <div className='w-[20%] truncate pt-3 text-right capitalize' />
            <div className='w-[80%] pl-5'>
              <Button
                className='flex items-center bg-orange text-sm text-white hover:bg-orange/60 rounded-sm capitalize h-10 px-6'
                type='submit'
              >
                lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
