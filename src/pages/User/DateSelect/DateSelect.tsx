/* eslint-disable @typescript-eslint/no-unused-expressions */
import { range } from 'lodash'
import { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ errorMessage, onChange, value }: Props) {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: ValueFormSelect, name } = event.target
    const newDay = {
      day: value?.getDate() || date.day,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: ValueFormSelect
    }
    setDate(newDay)
    onChange && onChange(new Date(newDay.year, newDay.month, newDay.day))
  }

  return (
    <div className='flex flex-wrap mt-6'>
      <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
      <div className='w-[80%] pl-5'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='day'
            value={value?.getDate() || date.day}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange '
          >
            <option disabled className='bg-blue-600 text-white rounded-sm font-medium text-lg'>
              ngày
            </option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            value={value?.getMonth() || date.month}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange '
          >
            <option disabled className='bg-blue-600 text-white rounded-sm font-medium text-lg'>
              tháng
            </option>
            {/* thang bat dau tu ko dinh nghia la nhu the  */}
            {range(0, 12).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='year'
            value={value?.getFullYear() || date.year}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange'
          >
            <option disabled className='bg-blue-600 text-white rounded-sm font-medium text-lg'>
              năm
            </option>
            {range(1990, 2026).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            {/* <option value='năm'>năm</option>
                  <option value='năm'>tháng</option> */}
          </select>
        </div>
        <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
      </div>
    </div>
  )
}
