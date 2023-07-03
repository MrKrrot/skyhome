import { Schema, model, Document } from 'mongoose'

export interface IUser {
  username?: string
  email: string
  password: string
}

const userSchema = new Schema<IUser, Document>({
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
    validate: {
      validator: async (value: string) => {
        const usernameCount = await model('User').countDocuments({ username: value })
        return usernameCount === 0
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    validate: {
      validator: async (value: string) => {
        const emailCount = await model('User').countDocuments({ email: value })
        return emailCount === 0
      }
    }
  },
  password: {
    type: String,
    required: [true, 'password is required']
  }
})

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v
    delete ret.password
  }
})

export default model<IUser>('User', userSchema)
