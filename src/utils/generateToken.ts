import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '@config'

const generateAccessToken = (id: Types.ObjectId) => {
  return jwt.sign({ sub: id }, JWT_ACCESS_SECRET, { expiresIn: '15m' })
}

const generateRefreshToken = (id: Types.ObjectId) => {
  return jwt.sign({ sub: id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

export { generateAccessToken, generateRefreshToken }
