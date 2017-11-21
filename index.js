import cantal from '@evo/cantal-js';

export function init() {
    const requests = new cantal.Counter({
        group: 'incoming',
        metric: 'requests',
    });

    const duration = new cantal.Counter({
        group: 'incoming',
        metric: 'total_duration',
    });

    const inProgress = new cantal.Integer({
        group: 'incoming',
        metric: 'in_progress',
    });

    cantal.start();

    function cantalMiddleware(req, res, next) {
        requests.incr();
        const start = Date.now();
        inProgress.incr();

        res.on('finish', () => {
            inProgress.decr();
            const timeDelta = Date.now() - start;
            duration.incr(timeDelta);
        });

        next();
    }

    return cantalMiddleware;
}
