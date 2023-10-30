import winston from 'winston';
import TransportElastic from 'elasticsearch-transport'

const { APP_ENV, ELASTIC_PASSWORD } = process.env

const serviceName = 'authentication'

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

    if (APP_ENV !== 'production') {
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
