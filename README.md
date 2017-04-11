# cantal-express
Cantal metrics for express

## Installation
```bash
npm install --save @evo/cantal-js @evo/cantal-express
```

## Usage example:
```js
import express from 'express';
import { init as canatalInit } from './cantal-express';

const app = express();

app.use(canatalInit());
```

## Metrics:

### incoming group
* request_count (counter) - requests count.
* request_time (integer) - request time.
