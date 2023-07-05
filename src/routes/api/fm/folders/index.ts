import { Router } from 'express'

import { methodNotAllowed } from '@middlewares'

const router = Router()

router.post('/', (req, res) => res.json({ message: 'Create Folder' }))
router.post('/:folderId', (req, res) => res.json({ message: 'Create Folder in Directory' }))
router.patch('/:folderId', (req, res) => res.json({ message: 'Rename Folder' }))
router.delete('/:folderId', (req, res) => res.json({ message: 'Delete Folder' }))

router.all('/', methodNotAllowed)
router.all('/:path', methodNotAllowed)

export default router
