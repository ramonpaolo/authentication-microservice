import prometheus from 'prom-client'

const register = new prometheus.Registry()

register.setDefaultLabels({
    service: 'authentication',
    env: process.env.APP_ENV,
})

prometheus.collectDefaultMetrics({
    register,
});

const counterRequestsHTTP = new prometheus.Counter({
    name: 'nodejs_counter_http_requests',
    help: 'Counter of HTTP requests',
    labelNames: [
        'method',
        'status_code',
        'route',
        'env',
    ]
})

const delayPerformanceHTTP = new prometheus.Histogram({
    name: 'nodejs_delay_http_requests',
    help: 'Delay of HTTP requests',
    labelNames: [
        'method',
        'status_code',
        'route',
        'env',
    ]
})

register.registerMetric(counterRequestsHTTP)
register.registerMetric(delayPerformanceHTTP)

export {
  counterRequestsHTTP,
  delayPerformanceHTTP,
  prometheus,
}
