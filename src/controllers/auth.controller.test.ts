import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import request from 'supertest'

import app from '../app'
import { DB_URI_TEST } from '@config'
import { User } from '@models'

const api = request(app)

describe('Auth Controller', () => {
  describe('POST /auth/register', () => {
    beforeAll(async () => {
      await mongoose.connect(DB_URI_TEST)
      await User.deleteMany({})
    })

    afterEach(async () => {
      await User.deleteMany({})
    })

    afterAll(async () => {
      await mongoose.connection.close()
    })

    it('should return 201 and the user data', async () => {
      const userCredentials = {
        username: 'test',
        email: 'user.test@hotmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      }

      const res = await api.post('/auth/register').send(userCredentials)

      expect(res.status).toBe(201)

      expect(res.body.username).toBe(userCredentials.username)
      expect(res.body.email).toBe(userCredentials.email)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('accessToken')
      expect(res.body).toHaveProperty('refreshToken')
      expect(res.body).not.toHaveProperty('password')
    })

    it('should return 400 if passwords do not match', async () => {
      const userCredentials = {
        username: 'test',
        email: 'user.test@hotmail.com',
        password: '123456',
        passwordConfirmation: '12345'
      }

      const res = await api.post('/auth/register').send(userCredentials)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['passwords do not match'],
        statusCode: 400
      })
    })

    it('should return 400 if email is invalid', async () => {
      const userCredentials = {
        username: 'test',
        email: 'user.testhotmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      }

      const res = await api.post('/auth/register').send(userCredentials)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['email must be a valid email'],
        statusCode: 400
      })
    })

    it('should return 400 if username is less than 3 characters', async () => {
      const userCredentials = {
        username: 'te',
        email: 'user.test@hotmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      }

      const res = await api.post('/auth/register').send(userCredentials)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['username must be at least 3 characters'],
        statusCode: 400
      })
    })

    it('should return 400 if password is less than 6 characters', async () => {
      const userCredentials = {
        username: 'test',
        email: 'user.test@hotmail.com',
        password: '12345',
        passwordConfirmation: '12345'
      }

      const res = await api.post('/auth/register').send(userCredentials)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['password must be at least 6 characters'],
        statusCode: 400
      })
    })

    it('should return 409 if username is already taken', async () => {
      const hashPassword = await bcrypt.hash('123456', 10)
      await User.create({
        username: 'test',
        email: 'user.test@hotmail.com',
        password: hashPassword
      })

      const userRepeatedCredentials = {
        username: 'test',
        email: 'other.test@hotmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      }

      const res = await api.post('/auth/register').send(userRepeatedCredentials)

      expect(res.status).toBe(409)
      expect(res.body).toMatchObject({
        message: ['username test is already taken.'],
        statusCode: 409
      })
    })
  })

  describe('POST /auth/login', () => {
    beforeAll(async () => {
      await mongoose.connect(DB_URI_TEST)
      const hashPassword = await bcrypt.hash('123456', 10)
      await User.create({
        username: 'test',
        email: 'user.test@hotmail.com',
        password: hashPassword
      })
    })

    afterAll(async () => {
      await mongoose.connection.close()
    })

    it('should return 200 and the user data', async () => {
      const userCredentials = {
        email: 'user.test@hotmail.com',
        password: '123456'
      }

      const res = await api.post('/auth/login').send(userCredentials)

      expect(res.status).toBe(200)
      // expect(res.body).toHaveProperty('_id')
      // expect(res.body.username).toBe('test')
      // expect(res.body.email).toBe(userCredentials.email)
      // expect(res.body).toHaveProperty('accessToken')
      // expect(res.body).toHaveProperty('refreshToken')
      // expect(res.body).not.toHaveProperty('password')
    })
  })
})
