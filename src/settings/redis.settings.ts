import Redis from 'ioredis'

// Utils
import { loggerError } from '../utils/logger.utils'

const { REDIS_URL } = process.env

const redis = new Redis(String(REDIS_URL))

const set = async (key: string, value: string, ttl = 3000): Promise<boolean> => {
    try {
        const wasSetedWithSuccess = await redis.setex(key, ttl, value)

        return !!wasSetedWithSuccess
    } catch (error) {
        loggerError(error, 'failed to set cache on redis')

        return false
    }
}

const get = async (key: string): Promise<string | null> => {
    try {
        const value = await redis.get(key)

        return value
    } catch (error) {
        loggerError(error, 'failed to get value on redis')

        return null;
    }
}

export {
    set,
    get,
    redis,
}