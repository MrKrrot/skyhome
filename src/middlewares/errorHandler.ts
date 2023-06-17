import { NextFunction, Request, Response } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.send({ status: 500, message: err.message })
}

export default errorHandler
