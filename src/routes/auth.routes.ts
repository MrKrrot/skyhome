import { Router } from 'express'

import { authController } from '@controllers'
import { methodNotAllowed, schemaValidator } from '@middlewares'
import { createUserSchema } from '@validations'

const router = Router()

router.post('/register', schemaValidator(createUserSchema), authController.register)

router.all('/register', methodNotAllowed)

export default router
