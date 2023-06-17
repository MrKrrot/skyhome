import mongoose from 'mongoose'

import { DB_URI } from '@config'
import { logger } from '@utils'

const connect = async () => {
  try {
    await mongoose.connect(DB_URI)

    logger.info('Database connected')
  } catch (error) {
    logger.error(`Could not connect to Database: ${error}`)
  }
}

export default connect
