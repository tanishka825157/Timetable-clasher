import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../lib/AppError.js'
import { logger } from '../lib/logger.js'

export function notFoundHandler(request: Request, response: Response) {
  response.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${request.method} ${request.originalUrl} was not found.`,
    },
  })
}

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  const isKnownError = error instanceof AppError
  const statusCode = isKnownError ? error.statusCode : 500

  if (!isKnownError) {
    logger.error({ err: error }, 'Unhandled API error')
  }

  response.status(statusCode).json({
    error: {
      code: isKnownError ? error.code : 'INTERNAL_SERVER_ERROR',
      message: isKnownError ? error.message : 'An unexpected error occurred.',
    },
  })
}
