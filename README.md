# load-balancer-algorithm
![CI](https://github.com/xu8511831/load-balancers/workflows/CI/badge.svg) ![version](https://img.shields.io/npm/v/load-balancer-algorithm?color=brightgreen) ![size](https://img.shields.io/bundlephobia/min/load-balancer-algorithm?color=brightgreen)

Just load balancing algorithms implementation.

Currently supported load balancing algorithms include:
- Random
- Weighted Random
- Round Robin
- Weighted Round Robin
- Consistent Hash

You can debug the project in VS CODE.

## Installation
```bash
$ npm i load-balancer-algorithm
# or
$ yarn add load-balancer-algorithm
```

## Getting Started

### typescript
```ts
import LBA, { Random } from "load-balancer-algorithm";

const weightPool = [
  { host: "127.0.0.2:6061", weight: 2 },
  { host: "127.0.0.1:6062", weight: 3 },
  { host: "127.0.0.3:6063", weight: 10 },
];

const wrr = new LBA.WeightedRoundRobin(weightPool);
const wrrAddress = wrr.pick();

// should return { host }
console.log(wrrAddress)

// non-weighted
const pool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];

const r = new Random(pool);
const rAddress = r.pick();

// should return { host }
console.log(rAddress)
```

### commomjs
```js
const LBA = require('load-balancer-algorithm');

const weightPool = [
  { host: "127.0.0.2:6061", weight: 2 },
  { host: "127.0.0.1:6062", weight: 3 },
  { host: "127.0.0.3:6063", weight: 10 },
];

const loadBalance = new LBA.WeightRandom(weightPool);
const host = loadBalance.pick();

console.log(host)
```

## API
### .pool
The property will be get pool of an instance.

### .size
Returns the number of in pool object.

### .pick(args?: array)
Will get a object from the pool based on the different algorithms.

### .reset(pool: array)
Reset the instance fully.

### .getWeight(host: string)
Returns a weight value associated to the host.


## Build

execute `npm run build` from a terminal window

## Test

let's run the test script

```bash
$ npm test
# or
$ yarn test
```

if you need the specify test file to run

```bash
$ npx mocha -r ts-node/register  --file './test/weightedRandom.test.ts'
```