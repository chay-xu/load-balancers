import { WeightedRoundRobin } from "../src/weightedRoundRobin";
import assert from "assert";

describe("WeightedRoundRobin", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  const maxWeight = 5;
  const weightRandomPool = [
    { host: "127.0.0.2:6061", weight: 2 },
    { host: "127.0.0.1:6062", weight: 3 },
    { host: "127.0.0.3:6063", weight: maxWeight },
  ];

  const random = new WeightedRoundRobin(weightRandomPool, {
    defaultWeight: maxWeight,
  });

  it("not weight property", function () {
    const random = new WeightedRoundRobin(randomPool);

    assert.ok(random.pool);
    assert.ok(typeof random.pool === "object");
  });

  it(".pick()", function () {
    assert(random.pick());
    assert(typeof random.pick().host === "string");
  });

  it(".currentIndex", function () {
    random.reset(weightRandomPool);
    assert(typeof random.currentIndex === "number");
    assert.equal(random.currentIndex, -1);
  });
  
  it(".gcdWeight", function () {
    random.reset(weightRandomPool);
    assert(typeof random.gcdWeight === "number");
    assert.equal(random.gcdWeight, 1);
  });

  it(".currentWeight", function () {
    random.reset(weightRandomPool);
    assert(typeof random.currentWeight === "number");
    assert.equal(random.currentWeight, 0);
  });

  it(".maxWeight", function () {
    random.reset(weightRandomPool);
    assert(typeof random.maxWeight === "number");
    // console.log(random);
    assert.equal(random.maxWeight, maxWeight);
  });

  it("load balance must be smooth", function(){
    const order = [];
    random.reset(weightRandomPool);

    for (let i = 0; i < 10; i++) {
      const ip = random.pick().host;
      order.push(random.getWeight(ip));
    }

    assert.notDeepStrictEqual(order, [5, 5, 5, 5, 5, 3, 3, 3, 2, 2]);
  });

  it("the ratio must be absolute equality of high traffic", function () {
    const statistics: Record<string, number> = {};
    const loop = 100000;
    let total: number;

    for (let i = 0; i < loop; i++) {
      const ip = random.pick().host;
      // console.log(ip);
      total = statistics[ip] || 0;
      statistics[ip] = total + 1;
    }

    const len = weightRandomPool.length;
    let totalWeight = 0;
    
    for(let i = 0; i < len; i++){
      const address = random.pool[i];
      const weight = random.getWeight(address);
      totalWeight += weight;
    }

    for(let i = 0; i < len; i++){
      const address = random.pool[i];
      const weight = random.getWeight(address);
      const count = statistics[address];

      const expectPer = Number((weight/totalWeight).toFixed(3));
      const realPer = Number((count/loop).toFixed(3));
      // console.log((weight/totalWeight), (count/loop));

      assert(Math.abs(expectPer - realPer) === 0);
    }
  });

  it(".reset()", function () {
    random.reset(randomPool);

    assert.equal(random.pool.length, randomPool.length);
    assert.equal(random.currentIndex, -1);
    assert.equal(random.currentWeight, 0);
    assert.equal(random.gcdWeight, 5);
    assert.equal(random.maxWeight, 5);
  });

  it("update pool list", function () {
    // randomPool.push("127.0.0.5");
    const randomPool = [
      { host: "127.0.0.2:6061", weight: 2 },
      { host: "127.0.0.4:6064", weight: 20 },
      { host: "127.0.0.1:6062", weight: 3 },
      { host: "127.0.0.3:6063", weight: 10 },
    ];
    random.reset(weightRandomPool);
    random.reset(randomPool);
    // console.log(random);
    
    // assert.deepStrictEqual(random.pool, randomPool);
    assert.equal(random.currentIndex, -1);
    assert.equal(random.currentWeight, 0);
    assert.equal(random.gcdWeight, 1);
    assert.equal(random.maxWeight, 20);
  });
});
