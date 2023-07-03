import { NextFunction, Response } from 'express'

import { authService } from '@services'
import { LoginRequest, RegisterRequest } from '@validations'

const login = async (req: LoginRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    const user = await authService.login({
      email,
      password
    })

    return res.status(200).json({
      ...user
    })
  } catch (error) {
    next(error)
  }
}

const register = async (req: RegisterRequest, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body

  try {
    const user = await authService.register({
      username,
      email,
      password
    })

    return res.status(201).json({
      ...user
    })
  } catch (error) {
    next(error)
  }
}

export default {
  login,
  register
}
