import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/button'
import { path } from 'src/contexts/path'
import type { Category } from 'src/types/Category.type'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type Schema } from 'src/utils/rules'
import type { NoUndefinedField } from 'src/types/utils.type'

import { omit } from 'lodash'
import RaitingStart from '../RaitingStart'
import type { queryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: queryConfig
  categaries: Category[]
}

type FormDara = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>
// type FormDara = Pick<Schema, 'price_min' | 'price_max'>
// type FormDara = Required<Pick<Schema, 'price_min' | 'price_max'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ categaries, queryConfig }: Props) {
  const { category } = queryConfig //lay category tren url id(no la id)
  // console.log('category', category)
  // console.log('categaries', categaries)

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormDara>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  // const valueWatch = watch()
  // console.log(errors)
  const navigate = useNavigate()
  const HandelOnSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  const handleRemoteAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter', 'page', 'sort_by'])
      ).toString()
    })
    // navigate('/')
  }
  return (
    <div className='py-6 '>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-2 w-3 h-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tat Ca San Pham
      </Link>
      <div className='bg-gray-800 h-[1px] w-full my-4'></div>

      <ul>
        {categaries.map((categariesItem) => {
          const issActive = category === categariesItem._id
          return (
            <li className='py-2 pl-2 flex' key={categariesItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categariesItem._id
                  }).toString()
                }}
                className={classNames('relative px-2  font-semibold', {
                  ' text-orange font-semibold': issActive
                })}
              >
                {issActive && (
                  <svg viewBox='0 0 4 7' className='h-2 w-2 fill-orange absolute top-1 left-[-5px]'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categariesItem.name}
              </Link>
            </li>
          )
        })}

        {/* <li className='py-2 pl-2 flex'>
            <Link to={path.home} className='relative px-2 '>
              Ao Khoac
            </Link>
          </li> */}
      </ul>
      <Link to={path.home} className='font-bold flex items-center mt-4 uppercase '>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 fill-current stroke-current mr-2'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        BO LoC TIM KIEM
      </Link>

      <div className='bg-gray-800 h-[0.5px] my-4'></div>

      <div className='my-5'>
        <div>Khoan Gia</div>
        <form className='mt-2' onSubmit={HandelOnSubmit}>
          <div className='flex items-start '>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    placeholder='Từ'
                    type='text'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
                    //p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    ref={field.ref}
                    value={field.value}
                    className='grow' //chiem het vung
                    classNameError='hidden' //ẩn error mesage
                  />
                )
              }}
            />
            <div className='mx-2 mt-2 shrink-0'></div>
            {/* <div className='flex items-start '> */}
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    placeholder='Đến'
                    type='text'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    ref={field.ref}
                    value={field.value}
                    className='grow' //chiem het vung
                    classNameError='hidden' //ẩn error mesage
                  />
                )
              }}
            />
            {/* </div> */}
          </div>
          <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
            Ap Dung
          </Button>
        </form>
      </div>

      {/* <div className='my-5'>
          <div>Khoan Gia</div>
          <form className='mt-2'>
            <div className='flex items-start '>
              <InputNumber
                placeholder='Tu'
                type='text'
                classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                onChange={}
                className='grow' //chiem het vung
              />
              <div className='m-2 shrink-0'>-</div>
              <InputNumber
                onChange={}
                placeholder='Den'
                type='text'
                classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                name='form'
                className='grow' //chiem het vung
              />
            </div>
          </form>
        </div> */}

      <div className='bg-gray-800 h-[1px] my-4'></div>
      <div className='text-sm'>Danh Gia</div>
      {/* <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-2' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
          </Link>
        </li>

        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-2' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Tro Len</span>
          </Link>
        </li>
      </ul> */}
      <RaitingStart queryConfig={queryConfig} />
      <div className='bg-gray-800 h-[1px] my-4'></div>
      <Button
        onClick={handleRemoteAll}
        className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'
      >
        Xoa Tat Ca
      </Button>
    </div>
  )
}
