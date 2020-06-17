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

  it("load balancer", function () {
    // console.log(random.pick());
    const statistics: Record<string, number> = {};
    const order = [];

    for (let i = 0; i < 10; i++) {
      const ip = random.pick();
      order.push(random.getWeight(ip));
    }
    // console.log(statistics, order);
    assert.deepStrictEqual(order, [5, 5, 3, 5, 2, 3, 5, 2, 3, 5]);

    const loop = 10000;
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
      // console.log((weight/totalWeight).toFixed(3), (count/loop).toFixed(3));

      // offset 2%
      assert(Math.abs(expectPer - realPer) <= 0.02);
    }
  });
});
