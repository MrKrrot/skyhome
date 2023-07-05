import { Router } from 'express'

import { methodNotAllowed } from '@middlewares'

const router = Router()

router.patch('/', (req, res) => res.json({ message: 'Change Password' }))
router.delete('/', (req, res) => res.json({ message: 'Delete Account' }))

router.all('/', methodNotAllowed)

export default router
