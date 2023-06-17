import { Router } from 'express'

import main from '@controllers'

const router = Router()

router.use('/', main)

export default router
