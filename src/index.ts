import { address } from 'ip'

import app from './app'
import { PORT, NODE_ENV } from '@config'
import { connect, logger } from '@utils'

export const bootstrap = () => {
  app.listen(PORT, async () => {
    logger.info(
      `Server is running on http://${NODE_ENV === 'production' ? address() : 'localhost'}:${PORT}`
    )
    await connect()
  })
}

bootstrap()
