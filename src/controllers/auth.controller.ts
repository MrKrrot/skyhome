import { NextFunction, Response } from 'express'

import { authService } from '@services'
import { RegisterRequest } from '@validations'

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
  register
}
