declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;

            NODE_ENV: 'test' | 'development' | 'production';
            APP_ENV: 'test' | 'development' | 'staging' | 'production';

            // DATADOG
            DD_API_KEY: string = '';

            // POSTGRES
            POSTGRES_USERNAME: string = ''
            POSTGRES_PASSWORD: string = ''
            POSTGRES_DATABASE: string = ''
            POSTGRES_URL: string = ''
            POSTGRES_HOST: string = ''

            // REDIS
            REDIS_HOST: string = ''
            REDIS_URL: string = ''
        }
    }
}
export { }
