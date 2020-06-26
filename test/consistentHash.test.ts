import { ConsistentHash } from "../src/consistentHash";
import assert from "assert";
// import chai from "chai";


describe("ConsistentHash", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  // const randomPool = ["127.0.0.1", "127.0.0.3"];
  const weightRandomPool = [
    { host: "127.0.0.2", weight: 2 },
    { host: "127.0.0.1", weight: 3 },
    { host: "127.0.0.3", weight: 10 },
  ];

  const random = new ConsistentHash(randomPool);

  it("has weight property", function () {
    const random = new ConsistentHash(weightRandomPool);

    assert(random.pool);
    assert(typeof random.pool === "object");
  });

  it(".pick()", function () {
    assert(random.pick());
    assert(typeof random.pick().host === "string");
  });

  it("hash must be consistent", function () {
    const loop = 100;
    
    for (let i = 0; i < loop; i++) {
      const node = random.pick([`test${i}`]);
      const ip = node.host;

      for (let i = 0; i < loop; i++) {
        assert(random.pick(node.args).host === ip);
      }
    }
  });

  it("the offset must be less than 20% of high traffic", function () {
    const statistics: Record<string, number> = {};
    const loop = 100000;
    let total: number;

    for (let i = 0; i < loop; i++) {
      const node = random.pick([`test${i}`]);
      const ip = node.host;

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

      // offset 20%
      assert(Math.abs(expectPer - realPer) < 0.2);
    }
    
  });

  it(".reset()", function () {
    random.reset(weightRandomPool);
    // console.log(random.pool);
    assert.equal(random.pool.length, weightRandomPool.length);
  });
});