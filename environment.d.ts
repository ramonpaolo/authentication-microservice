declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;

            NODE_ENV: 'test' | 'development' | 'production';
            APP_ENV: 'test' | 'development' | 'staging' | 'production';

            // POSTGRES
            DATABASE_USERNAME: string = ''
            DATABASE_PASSWORD: string = ''
            DATABASE_DATABASE: string = ''
            DATABASE_URL: string = ''
            DATABASE_HOST: string = ''

            // REDIS
            REDIS_HOST: string = ''
            REDIS_URL: string = ''
        }
    }
}
export { }
