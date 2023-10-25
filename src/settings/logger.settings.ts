import winston from 'winston';
import { hostname } from 'os';

const { DD_API_KEY, APP_ENV } = process.env

const serviceName = 'authentication'

const httpOptions: winston.transports.HttpTransportOptions = {
    host: 'http-intake.logs.datadoghq.com',
    path: `/api/v2/logs?dd-api-key=${DD_API_KEY}&ddsource=nodejs&service=${serviceName}-${APP_ENV}&hostname=${hostname()}`,
    ssl: true,
}

const chooseTransport = () => {
    if (APP_ENV === 'production') {
        return [
            new winston.transports.Http(httpOptions),
        ]
    }

    return [
        new winston.transports.Console(),
    ]
}

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.prettyPrint()),
    transports: chooseTransport(),
    silent: APP_ENV === 'test',
    defaultMeta: {
        service: serviceName,
        env: APP_ENV,
    },
})

export default logger
