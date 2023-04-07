import { useRef } from 'react'
import { toast } from 'react-toastify'

import { config } from 'src/constants/config'

import Button from '../Button'

interface InputFileProps {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error(`Maximum file usage 1 MB, Format: .JPEG, .PNG`)
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => ((event.target as any).value = null)}
      />
      <Button className='button-secondary' type='button' onClick={handleUpload}>
        Select Picture
      </Button>
    </>
  )
}
