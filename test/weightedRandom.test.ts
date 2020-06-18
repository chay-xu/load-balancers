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

  it("the offset must be less than 1% of high traffic", function () {
    const statistics: Record<string, number> = {};

    const loop = 100000;
    let total: number;
    for (let i = 0; i < loop; i++) {
      const ip = random.pick();
      total = statistics[ip] || 0;
      statistics[ip] = total + 1;
    }
    // console.log(statistics);

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
      // console.log(Math.abs(expectPer - realPer));
      assert(Math.abs(expectPer - realPer) <= 0.01);
    }
    
  });
});