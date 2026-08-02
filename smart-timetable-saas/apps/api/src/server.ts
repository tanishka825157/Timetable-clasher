import 'dotenv/config'
import { app } from './app.js'
import { env } from './config/env.js'
import { logger } from './lib/logger.js'

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT, environment: env.NODE_ENV }, 'API server started')
})

server.on('error', (error) => {
  logger.fatal({ err: error }, 'API server failed to start')
  process.exit(1)
})

function shutdown(signal: string) {
  logger.info({ signal }, 'Closing API server')
  server.close(() => process.exit(0))
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
