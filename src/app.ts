import cors from 'cors'
import compression from 'compression'
import express from 'express'
import listEndpoints from 'express-list-endpoints'

import { NODE_ENV } from '@config'
import { errorHandler, routesLogger } from '@middlewares'
import routes from '@routes'
import { logger, getColorForMethod } from '@utils'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routesLogger)

app.use('/api', routes)

app.use(errorHandler)
app.use(compression())

if (NODE_ENV !== 'production') {
  logger.info('+Available routes:')
  listEndpoints(app).forEach(route => {
    route.methods.forEach(method => {
      logger.info(`- ${getColorForMethod(method)} \t${route.path}`)
    })
  })
}

export default app
