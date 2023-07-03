import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User, IUser } from '@models'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '@config'

const register = async ({ username, email, password }: IUser) => {
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    email,
    password: passwordHash
  })

  const accessToken = jwt.sign({ sub: user._id }, JWT_ACCESS_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ sub: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })

  return {
    ...user.toJSON(),
    accessToken,
    refreshToken
  }
}

export default {
  register
}
