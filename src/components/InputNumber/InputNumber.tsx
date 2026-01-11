import { forwardRef, useState, type InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMassage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  {
    className,
    errorMassage,
    onChange,
    value,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleOnChang = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    //request kiểm tra số
    if (/^\d+$/.test(value) || value === '') {
      //thực thi onchange callback từ bên ngoài truyền vào props
      onChange?.(event)
      //khi người dùng gõ số onchange nó mới chạy ngược lại thì không

      setLocalValue(value)
      //cập nhập localValue
    }
  }

  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleOnChang} value={value || localValue} {...rest} ref={ref} />
      <div className={classNameError}>{errorMassage}</div>
    </div>
  )
})
export default InputNumber
