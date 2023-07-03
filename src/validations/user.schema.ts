import { Request } from 'express'
import { TypeOf, object, string } from 'zod'

export const createUserSchema = object({
  username: string({ required_error: 'username is required' }).min(
    3,
    'username must be at least 3 characters'
  ),
  email: string({ required_error: 'email is required' }).email({
    message: 'email must be a valid email'
  }),
  password: string({ required_error: 'password is required' }).min(
    6,
    'password must be at least 6 characters'
  ),
  passwordConfirmation: string({ required_error: 'password confirmation is required' })
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'passwords do not match',
  path: ['passwordConfirmation']
})

export const loginUserSchema = object({
  email: string({ required_error: 'email is required' }),
  password: string({ required_error: 'password is required' })
})

export type LoginUserSchema = TypeOf<typeof loginUserSchema>
export type CreateUserSchema = TypeOf<typeof createUserSchema>

export type LoginRequest = Request<object, object, LoginUserSchema>
export type RegisterRequest = Request<object, object, CreateUserSchema>
