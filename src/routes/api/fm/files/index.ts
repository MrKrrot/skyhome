import { Router } from 'express'

import { methodNotAllowed } from '@middlewares'

const router = Router()

router.post('/', (req, res) => res.json({ message: 'Upload Files' }))
router.patch('/', (req, res) => res.json({ message: 'Rename Files' }))
router.delete('/', (req, res) => res.json({ message: 'Delete Files' }))
router.post('/:folderId', (req, res) => res.json({ message: 'Upload Files in Directory' }))
router.patch('/:folderId', (req, res) => res.json({ message: 'Rename Files in Directory' }))
router.delete('/:folderId', (req, res) => res.json({ message: 'Delete Files in Directory' }))

router.all('/', methodNotAllowed)
router.all('/:folderId', methodNotAllowed)

export default router
