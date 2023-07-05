import { Router } from 'express'

import { methodNotAllowed } from '@middlewares'
import filesRouter from './files'
import foldersRouter from './folders'

const router = Router()

router.get('/', (req, res) => res.json({ message: 'Folder Management' }))
router.get('/:path', (req, res) => res.json({ message: 'Folder Management in Directory' }))

router.use('/files', filesRouter)
router.use('/folders', foldersRouter)

router.all('/', methodNotAllowed)
router.all('/:path', methodNotAllowed)

export default router
