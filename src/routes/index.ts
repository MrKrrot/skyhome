import { methodNotAllowed } from '@middlewares'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.send('Hello World!'))

router.all('/', methodNotAllowed)

export default router
