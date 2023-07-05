import { Router } from 'express'

import fmRouter from './fm'
import usersRouter from './users'

const router = Router()

router.use('/fm', fmRouter)
router.use('/users', usersRouter)

export default router
