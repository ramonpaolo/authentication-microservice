import winston from 'winston';
import { hostname } from 'os';
import TransportElastic from 'elasticsearch-transport'

const { DD_API_KEY, APP_ENV, ELASTIC_PASSWORD } = process.env

const serviceName = 'authentication'

const httpOptions: winston.transports.HttpTransportOptions = {
    host: 'http-intake.logs.datadoghq.com',
    path: `/api/v2/logs?dd-api-key=${DD_API_KEY}&ddsource=nodejs&service=${serviceName}-${APP_ENV}&hostname=${hostname()}`,
    ssl: true,
}

const chooseTransport = () => {
    const transports: winston.transport[] = [
        new TransportElastic({
            silent: false,
            elasticClient: {
                node: 'http://elasticsearch:9200',
                auth: {
                    username: 'elastic',
                    password: String(ELASTIC_PASSWORD),
                },
            }
        }),
    ]

    if (APP_ENV === 'production') {
        transports.push(
            new winston.transports.Http(httpOptions)
        )
    } else {
        transports.push(
            new winston.transports.Console(),
        )
    }

    return transports;
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
