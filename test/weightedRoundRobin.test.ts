import { WeightedRoundRobin } from "../src/weightedRoundRobin";
import assert from "assert";

describe("WeightedRoundRobin", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  const weightRandomPool = [
    { host: "127.0.0.2:6061", weight: 2 },
    { host: "127.0.0.1:6062", weight: 3 },
    { host: "127.0.0.3:6063", weight: 5 },
  ];

  const random = new WeightedRoundRobin(weightRandomPool, {
    defaultWeight: 10,
  });

  it("not weight property", function () {
    const random = new WeightedRoundRobin(randomPool);

    assert.ok(random.pool);
    assert.ok(typeof random.pool === "object");
  });

  it(".pick()", function () {
    assert(random.pick());
    assert(typeof random.pick() === "string");
  });

  it(".currentIndex", function () {
    random.reset();
    assert(typeof random.currentIndex === "number");
    assert.equal(random.currentIndex, -1);
  });
  
  it(".gcdWeight", function () {
    random.reset();
    assert(typeof random.gcdWeight === "number");
    assert.equal(random.gcdWeight, 1);
  });

  it(".currentWeight", function () {
    random.reset();
    assert(typeof random.currentWeight === "number");
    assert.equal(random.currentWeight, 0);
  });

  it("load balance must be smooth", function(){
    const order = [];
    random.reset();

    for (let i = 0; i < 10; i++) {
      const ip = random.pick();
      order.push(random.getWeight(ip));
    }
    // console.log(statistics, order);
    assert.deepStrictEqual(order, [5, 5, 3, 5, 2, 3, 5, 2, 3, 5]);
  });

  it("the ratio must be absolute equality of high traffic", function () {
    const statistics: Record<string, number> = {};
    const loop = 100000;
    let total: number;

    for (let i = 0; i < loop; i++) {
      const ip = random.pick();
      // console.log(ip);
      total = statistics[ip] || 0;
      statistics[ip] = total + 1;
    }

    const len = weightRandomPool.length;

    for(let i = 0; i < len; i++){
      const address = random.pool[i];
      const weight = random.getWeight(address);
      const totalWeight = random.totalWeight;
      const count = statistics[address];

      const expectPer = Number((weight/totalWeight).toFixed(3));
      const realPer = Number((count/loop).toFixed(3));
      // console.log((weight/totalWeight), (count/loop));

      assert(Math.abs(expectPer - realPer) === 0);
    }
  });
});
