import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import { DB_URI_TEST } from '@config'
import { User } from '@models'

import authService from './auth.service'

describe('Auth Service', () => {
  beforeAll(async () => {
    await mongoose.connect(DB_URI_TEST)
    await User.deleteMany({})
    await User.create({
      username: 'user.test',
      email: 'user.test@hotmail.com',
      password: await bcrypt.hash('password', 10)
    })
  })

  afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
  })

  describe('Login', () => {
    it('should return the user object with the access and refresh tokens', async () => {
      const user = await authService.login({
        email: 'user.test@hotmail.com',
        password: 'password'
      })

      expect(user).toHaveProperty('_id')
      expect(user).toHaveProperty('username', 'user.test')
      expect(user).toHaveProperty('email', user.email)
      expect(user).toHaveProperty('accessToken')
      expect(user).toHaveProperty('refreshToken')
      expect(user).not.toHaveProperty('password')
    })

    it('should throw an error when the email is incorrect', async () => {
      let thrownError

      try {
        await authService.login({
          email: 'notfound.user@hotmail.com',
          password: 'password'
        })
      } catch (error) {
        thrownError = error
      }

      expect(thrownError).toHaveProperty('message', 'Incorrect email or password.')
      expect(thrownError).toHaveProperty('statusCode', 401)
    })

    it('should throw an error when the password is incorrect', async () => {
      let thrownError

      try {
        await authService.login({
          email: 'user.test@hotmail.com',
          password: 'wrong_password'
        })
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).toHaveProperty('message', 'Incorrect email or password.')
      expect(thrownError).toHaveProperty('statusCode', 401)
    })
  })

  describe('Register', () => {
    it('should return the user object with the access and refresh tokens', async () => {
      const user = await authService.register({
        username: 'new.user.test',
        email: 'new.user@hotmail.com',
        password: 'password'
      })

      expect(user).toHaveProperty('_id')
      expect(user).toHaveProperty('username', 'new.user.test')
      expect(user).toHaveProperty('email', 'new.user@hotmail.com')
      expect(user).toHaveProperty('accessToken')
      expect(user).toHaveProperty('refreshToken')
      expect(user).not.toHaveProperty('password')
    })

    it('should throw an error when the email is already in use', async () => {
      let thrownError

      try {
        await authService.register({
          username: 'new.user2.test',
          email: 'user.test@hotmail.com',
          password: 'password'
        })
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).toHaveProperty('name', 'ValidationError')
      expect(thrownError).toHaveProperty(
        'message',
        'User validation failed: email: Validator failed for path `email` with value `user.test@hotmail.com`'
      )
    })

    it('should throw an error when the username is already in use', async () => {
      let thrownError

      try {
        await authService.register({
          username: 'new.user.test',
          email: 'user.test.2@hotmail.com',
          password: 'password'
        })
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).toHaveProperty('name', 'ValidationError')
      expect(thrownError).toHaveProperty(
        'message',
        'User validation failed: username: Validator failed for path `username` with value `new.user.test`'
      )
    })
  })
})
