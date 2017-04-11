import cantal from '@evo/cantal-js';


export function init() {
    const requestCounter = new cantal.Counter({
        group: 'incoming',
        metric: 'request_count',
    });

    const requestTime = new cantal.Integer({
        group: 'incoming',
        metric: 'request_time',
    });

    cantal.start();

    function cantalMiddleware(req, res, next) {
        requestCounter.incr();
        const start = Date.now();

        res.on('finish', () => {
            const duration = Date.now() - start;
            requestTime.set(duration);
        });

        next();
    }

    return cantalMiddleware;
}
