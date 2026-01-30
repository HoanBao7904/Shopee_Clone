import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'

import userAPI from 'src/apis/user.api'
import Button from 'src/button'
// import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { userSchema, type UserSchemaType } from 'src/utils/rules'
import DateSelect from '../../DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfile } from 'src/utils/auth'

import { getAvatarUrl } from 'src/utils/utils'
import Input from 'src/components/Input/Input'
import InputFile from 'src/components/InputFile'

function Info() {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<FormData>()
  return (
    <Fragment>
      <div className='flex flex-wrap mt-6'>
        <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
        <div className='w-[80%] pl-5'>
          <Input
            classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            register={register}
            errorMassage={errors.name?.message}
            placeholder='Tên'
            name='name'
          />
        </div>
      </div>
      <div className='flex flex-wrap mt-6'>
        <div className='w-[20%] truncate pt-3 text-right capitalize'>số điện thoại</div>
        <div className='w-[80%] pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='số điện thoại'
                errorMassage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}

// import { getAvatarUrl } from 'src/utils/utils'

type FormData = Pick<UserSchemaType, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
// type FromDataError = Omit<FormData, 'date_of_birth'> & {
//   date_of_birth?: string
// }
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const [file, setFile] = useState<File>()
  const prevImageFile = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const { setProfile: setProfileUser } = useContext(AppContext)
  // const {
  //   register,
  //   control,
  //   formState: { errors },
  //   handleSubmit,
  //   setValue,
  //   watch
  // } = useForm<FormData>({
  //   defaultValues: {
  //     name: '',
  //     phone: '',
  //     address: '',
  //     avatar: '',
  //     date_of_birth: new Date(1990, 0, 1) //tháng bắt đầu số 0
  //   },
  //   resolver: yupResolver(profileSchema)
  // })

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1) //tháng bắt đầu số 0
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = methods

  const avatar = watch('avatar')
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile //()=> userAPI.getProfile()
  })

  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile
  })
  const uploadAvaterMutation = useMutation({
    mutationFn: userAPI.uploadAvata
  })
  //khi nào có data thì set vào form
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || '')
      setValue('address', profile.address || '')
      setValue('avatar', profile.avatar || '')
      setValue('phone', profile.phone || '')
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
  // console.log(profile)

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data)
    try {
      let avatarName = avatar
      if (file) {
        const from = new FormData()
        from.append('image', file)
        const uploadRes = await uploadAvaterMutation.mutateAsync(from)
        // console.log(uploadRes.data.data)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfileUser(res.data.data)
      setProfile(res.data.data)

      refetch()
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  })

  const handleSetFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b border-b-gray-400 py-5'>
        <h1 className='text-lg font-medium text-black capitalize'>Hồ Sơ Của Tôi</h1>
        <div className='text-sm text-gray-300 mt-1'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <FormProvider {...methods}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow pr-12 md:mt:0'>
            <div className='flex flex-wrap'>
              <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
              <div className='w-[80%] pl-5'>
                <div className='pt-3 text-gray-700 '>{profile?.email}</div>
              </div>
            </div>
            <Info />
            <div className='flex flex-wrap mt-6'>
              <div className='w-[20%] truncate pt-3 text-right capitalize'>địa chỉ</div>
              <div className='w-[80%] pl-5'>
                <Input
                  classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  errorMassage={errors.address?.message}
                  placeholder='địa chỉ'
                  name='address'
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

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
          <div className='flex justify-center md:border-l md:border-l-gray-300 md:w-72 '>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24 '>
                <img
                  // src={getAvatarUrl(profile?.avatar) || prevImageFile}
                  src={prevImageFile || getAvatarUrl(profile?.avatar)}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <InputFile onChange={handleSetFile} />

              <div className='mt-3 text-gray-400'>Dụng lượng file tối đa 1 MB</div>
              <div className='mt-3 text-gray-400'>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
