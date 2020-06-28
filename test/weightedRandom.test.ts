import { WeightRandom } from "../src/weightedRandom";
import assert from "assert";


describe("WeightRandom", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  const weightRandomPool = [
    { host: "127.0.0.2:6061", weight: 2 },
    { host: "127.0.0.1:6062", weight: 3 },
    { host: "127.0.0.3:6063", weight: 10 },
  ];

  const random = new WeightRandom(weightRandomPool);

  it("not weight property", function () {
    const random = new WeightRandom(randomPool);

    assert.ok(random.pool);
    assert.ok(typeof random.pool === "object");
  });

  it(".pick()", function () {
    assert(random.pick());
    assert(typeof random.pick().host === "string");
  });

  it(".totalWeight", function () {
    assert(typeof random.totalWeight === "number");
  });

  it(".isWeightSame", function () {
    assert(typeof random.isWeightSame === "boolean");
  });

  it("the offset must be less than 1% of high traffic", function () {
    const statistics: Record<string, number> = {};
    const loop = 100000;
    let total: number;
    
    for (let i = 0; i < loop; i++) {
      const ip = random.pick().host;
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

      // offset 1%
      assert(Math.abs(expectPer - realPer) < 0.01);
    }
    
  });

  it(".reset()", function () {
    random.reset(randomPool);

    assert.equal(random.pool.length, randomPool.length);
    assert.equal(random.isWeightSame, true);
    assert.equal(random.totalWeight, 400);
  });
});