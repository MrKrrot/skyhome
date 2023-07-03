import { Router } from 'express'

import { authController } from '@controllers'
import { methodNotAllowed, schemaValidator } from '@middlewares'
import { createUserSchema, loginUserSchema } from '@validations'

const router = Router()

router.post('/login', schemaValidator(loginUserSchema), authController.login)
router.post('/register', schemaValidator(createUserSchema), authController.register)

router.all('/login', methodNotAllowed)
router.all('/register', methodNotAllowed)

export default router
