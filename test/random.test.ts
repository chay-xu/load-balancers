import { Random } from "../src/random";
import assert from "assert";
// import chai from "chai";


describe("Random", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  const weightRandomPool = [
    { host: "127.0.0.2", weight: 2 },
    { host: "127.0.0.1", weight: 3 },
    { host: "127.0.0.3", weight: 10 },
  ];

  const random = new Random(randomPool);

  it("has weight property", function () {
    const random = new Random(weightRandomPool);

    assert(random.pool);
    assert(typeof random.pool === "object");
  });

  it(".pick()", function () {
    assert(random.pick());
    assert(typeof random.pick().host === "string");
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
    // console.log(statistics);

    const len = randomPool.length;
    const avg = loop / len;
    const expectPer = Number((avg/loop).toFixed(3));

    for(let i = 0; i < len; i++){
      const address = random.pool[i];
      const count = statistics[address];

      const realPer = Number((count/loop).toFixed(3));
      // console.log((avg/loop), (count/loop));

      // offset 1%
      assert(Math.abs(expectPer - realPer) < 0.01);
    }
    
  });

  it(".reset()", function () {
    random.reset(weightRandomPool);
    // console.log(random);
    // assert(typeof random.isWeightSame === "boolean");
    assert.equal(random.pool.length, weightRandomPool.length);
  });
});