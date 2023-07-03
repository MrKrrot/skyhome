import bcrypt from 'bcrypt'

import { User, IUser } from '@models'
import { ServerError, generateAccessToken, generateRefreshToken } from '@utils'

const login = async ({ email, password }: IUser) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new ServerError('Incorrect email or password.', 401)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new ServerError('Incorrect email or password.', 401)
  }

  const accessToken = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  return {
    ...user.toJSON(),
    accessToken,
    refreshToken
  }
}

const register = async ({ username, email, password }: IUser) => {
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    email,
    password: passwordHash
  })

  const accessToken = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  return {
    ...user.toJSON(),
    accessToken,
    refreshToken
  }
}

export default {
  login,
  register
}
