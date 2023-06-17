import { Request, Response, Router } from 'express'

import main from '@services'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const result = main()
  res.json(result)
})

export default router
