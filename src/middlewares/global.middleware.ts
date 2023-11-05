import { NextFunction, Request, Response } from 'express'
import crypto from 'crypto'

// Utils
import { loggerInfo } from '../utils/logger.utils'

// Settings
import { counterRequestsHTTP, delayPerformanceHTTP } from '../settings/metrics.settings'

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timeStart = process.uptime()

    counterRequestsHTTP.inc({
        method: req.method,
        route: req.path,
        status_code: res.statusCode,
        env: process.env.APP_ENV,
    })
    const end = delayPerformanceHTTP.startTimer()

    const requestId = crypto.randomUUID()

    req.headers['x-request-id'] = requestId
    res.setHeader('X-Request-Id', requestId)

    res.setHeader('X-Powered-By', 'PHP 7.1')

    loggerInfo('initializing request', {
        body: req.body,
        headers: req.headers,
        request: {
            path: req.path,
            method: req.method,
            ip: req.ip,
        },
    }, req)

    res.on('finish', () => {
        const timeEnd = process.uptime()

        end({
            method: req.method,
            route: req.path,
            status_code: res.statusCode,
            env: process.env.APP_ENV,
        })

        loggerInfo('finishing request', {
            delay_performance: timeEnd - timeStart,
        }, req)
    })

    return next()
}

export default loggerMiddleware
