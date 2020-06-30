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

const loadBalance = new LBA.WeightedRoundRobin(weightPool);
const address = loadBalance.pick();

// should return { host }
console.log(address)
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

### .pick(args?: array)
Will get a object from the pool based on the different algorithms.

### .reset(pool: array)
Reset the instance fully.


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