import React, { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/contexts/config'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFilechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLacal = event.target.files?.[0]
    if (
      (fileFromLacal && fileFromLacal.size >= config.maxSizeIploadFileImage) ||
      !fileFromLacal?.type.includes('image')
    ) {
      toast.error('File không đúng định dạng quy định')
    } else {
      // console.log(fileFromLacal)
      if (onChange) {
        onChange(fileFromLacal)
      }
    }
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <Fragment>
      <input
        type='file'
        accept='.jbg,.png,.jpeg'
        className='hidden'
        ref={fileInputRef}
        onChange={onFilechange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        type='button'
        onClick={handleUpload}
        className='px-3 flex h-10 items-center justify-center bg-white test-sm text-gray-600 shadow-sm rounded-sm border border-gray-400'
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
