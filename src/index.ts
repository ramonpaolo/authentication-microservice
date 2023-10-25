import express from 'express'
import compression from 'compression'
import cors from 'cors'
import fs from 'fs'
import spdy from 'spdy'
import helmet from 'helmet'

// Settings
import logger from './settings/logger.settings'
import { redis } from './settings/redis.settings'
import prisma from './settings/prisma.settings'

// Middlewares
import loggerMiddleware from './middlewares/global.middleware'

const { PORT } = process.env;

(async () => {
    logger.info('initializing application');
})()

const app = express()

app.use(loggerMiddleware)

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(compression())

app.get('/api/v1/healthcheck', (_, res) => 
    res.status(200).json({
        status: 'success',
        message: 'project is working',
        uptime: process.uptime(),
    })
)

const server = spdy.createServer({
    cert: fs.readFileSync('server.crt'),
    key: fs.readFileSync('server.key'),
}, app)

server.listen(PORT)

const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT']

signals.forEach((signalToListen) => {
    process.on(signalToListen, async (signal) => {
        server.close(async () => {
            await prisma.$disconnect()
            await redis.quit()

            logger.warn({
                message: 'gracefully shutdown service',
                signal,
            })

            setTimeout(() => process.exit(0), 500)
        })
    })
})

export default server