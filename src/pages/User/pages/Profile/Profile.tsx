import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DateSelect from 'src/components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { ErrorResponse } from 'src/types/utils.type'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const { setProfile } = useContext(AppContext)

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date())
    }
  }, [profile, setValue])

  const avatar = watch('avatar')
  const onSubmit = handleSubmit(async (data) => {
    try {
      const avatarName = { name_file: avatar }
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName.name_file = uploadRes.data.data
        setValue('avatar', avatarName.name_file)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName.name_file
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message, { autoClose: 1000 })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    setFile(fileFromLocal)
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <div className='border-b border-t p-3 md:py-4 md:px-6 mmd:border-t-0 mmd:border-l'>
        <h1 className='fs-16 font-bold capitalize text-primary-377DFF md:fs-20'>My Profile</h1>
        <p className='fs-14'>Manage profile information for account security</p>
      </div>
      <div className='p-3 md:py-4 md:px-6 mmd:border-l'>
        <form className='flex flex-col-reverse gap-4 md:flex-row md:items-start md:gap-6' onSubmit={onSubmit}>
          <div className='flex-grow'>
            <div className='flex flex-col gap-2 md:gap-3'>
              <p className='fs-14 truncate font-semibold capitalize md:fs-16'>Email</p>
              <div className='bg-secondary-F8F8FB fs-14 flex h-10 w-full cursor-not-allowed items-center rounded-10 border px-3 md:fs-16 md:h-12 md:px-4'>
                {profile?.email}
              </div>
            </div>
            <div className='mt-5 flex flex-col gap-3 md:mt-6'>
              <p className='fs-14 font-semibold capitalize md:fs-16'>Full Name</p>
              <Input
                classNameInput='fs-14 h-10 w-full rounded-10 border px-3 outline-none transition-colors placeholder:fs-14 md:fs-16 md:placeholder:fs-16 md:h-12 md:px-4'
                register={register}
                name='name'
                errorMessage={errors.name?.message}
                placeholder='Full Name'
              />
            </div>
            <div className='flex flex-col gap-2 md:gap-3'>
              <p className='fs-14 font-semibold capitalize md:fs-16'>Phone Number</p>
              <div>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <InputNumber
                      classNameInput='fs-14 h-10 w-full rounded-10 border px-3 outline-none transition-colors placeholder:fs-14 md:fs-16 md:placeholder:fs-16 md:h-12 md:px-4'
                      placeholder='Phone Number'
                      errorMessage={errors.phone?.message}
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <p className='fs-14 font-semibold capitalize md:fs-16'>Address</p>
              <div>
                <Input
                  classNameInput='fs-14 h-10 w-full rounded-10 border px-3 outline-none transition-colors placeholder:fs-14 md:fs-16 md:placeholder:fs-16 md:h-12 md:px-4'
                  name='address'
                  placeholder='Address'
                  register={register}
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
            <Controller
              control={control}
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
              name='date_of_birth'
            />

            <div className='mt-1 flex flex-col'>
              <Button className='button-primary mt-2 items-center justify-center md:fs-16 sm:mx-auto' type='submit'>
                <span>Save</span>
              </Button>
            </div>
          </div>
          <div className='flex flex-col items-center mmd:w-[250px]'>
            <div className='my-4 h-24 w-24 md:my-5'>
              <img src={previewImage || getAvatarUrl(avatar)} alt='avatar' />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />
            <Button className='button-secondary' type='button' onClick={handleUpload}>
              Select Picture
            </Button>
            <div className='fs-12 mt-3 md:fs-14'>
              <p>
                Maximum file usage <span className='font-semibold'>1 MB</span>
              </p>
              <p>
                Format: <span className='font-semibold'>.JPEG, .PNG</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
