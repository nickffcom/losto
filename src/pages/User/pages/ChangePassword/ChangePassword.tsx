import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'

import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })
  const updateProfileMutation = useMutation(userApi.updateProfile)

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div>
      <div className='border-t-secondary-EDEDF6 border-b-secondary-EDEDF6 mmd:border-l-secondary-EDEDF6 border-b border-t p-3 md:py-4 md:px-6 mmd:border-t-0 mmd:border-l'>
        <h1 className='fs-16 font-bold capitalize text-primary-377DFF md:fs-20'>Change Password</h1>
        <p className='text-secondary-9E9DA8 fs-14'>Manage profile information for account security</p>
      </div>
      <div className='p-3 md:py-4 md:px-6 mmd:border-l'>
        <form className='mr-auto max-w-2xl' onSubmit={onSubmit}>
          <div className='flex flex-col gap-2 md:gap-3'>
            <p className='text-primary-1A162E fs-14 truncate font-semibold capitalize md:fs-16'>Old Password</p>
            <Input
              className='relative'
              classNameInput='fs-14 h-10 w-full rounded-10 border px-3 outline-none transition-colors placeholder:fs-14 md:fs-16 md:placeholder:fs-16 md:h-12 md:px-4'
              register={register}
              name='password'
              type='password'
              placeholder='Old Password'
              errorMessage={errors.password?.message}
            />
          </div>
          <div className='flex flex-col gap-2 md:gap-3'>
            <p className='text-primary-1A162E fs-14 font-semibold capitalize md:fs-16'>New Password</p>
            <Input
              className='relative'
              classNameInput='fs-14 h-10 w-full rounded-10 border px-3 outline-none transition-colors placeholder:fs-14 md:fs-16 md:placeholder:fs-16 md:h-12 md:px-4'
              register={register}
              name='new_password'
              type='password'
              placeholder='New Password'
              errorMessage={errors.new_password?.message}
            />
          </div>
          <div className='flex flex-col gap-2 md:gap-3'>
            <p className='text-primary-1A162E fs-14 font-semibold capitalize md:fs-16'>Re-enter New Password</p>
            <Input
              className='relative'
              classNameInput='fs-14 h-10 w-full rounded-10 border px-3 outline-none transition-colors placeholder:fs-14 md:fs-16 md:placeholder:fs-16 md:h-12 md:px-4'
              register={register}
              name='confirm_password'
              type='password'
              placeholder='Re-enter New Password'
              errorMessage={errors.confirm_password?.message}
            />
          </div>
          <div className='mt-1 flex flex-col'>
            <Button className='button-primary mt-2 items-center justify-center md:fs-16 sm:mx-auto' type='submit'>
              <span>Save</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
