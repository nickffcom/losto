import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Email is required'
//     },
//     pattern: {
//       value:
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//       message: 'Invalid email'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Length from 5 - 160 character'
//     },
//     minLength: {
//       value: 5,
//       message: 'Length from 5 - 160 character'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Password is required'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Length from 6 - 160 character'
//     },
//     minLength: {
//       value: 6,
//       message: 'Length from 6 - 160 character'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Confirm password is required'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Length from 6 - 160 character'
//     },
//     minLength: {
//       value: 6,
//       message: 'Length from 6 - 160 character'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Please input correct password'
//         : undefined
//   }
// })

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .min(5, 'Length from 5 - 160 character')
    .max(160, 'Length from 5 - 160 character'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Length from 6 - 160 character')
    .max(160, 'Length from 6 - 160 character'),
  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .min(6, 'Length from 6 - 160 character')
    .max(160, 'Length from 6 - 160 character')
    .oneOf([yup.ref('password')], 'Please input correct password')
})

export type Schema = yup.InferType<typeof schema>
