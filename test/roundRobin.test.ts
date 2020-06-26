import { RoundRobin } from "../src/roundRobin";
import assert from "assert";
// import chai from "chai";


describe("RoundRobin", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  const weightRandomPool = [
    { host: "127.0.0.2", weight: 2 },
    { host: "127.0.0.1", weight: 3 },
    { host: "127.0.0.3", weight: 10 },
  ];

  const random = new RoundRobin(randomPool);

  it("has weight property", function () {
    const random = new RoundRobin(weightRandomPool);

    assert(random.pool);
    assert(typeof random.pool === "object");
  });

  it(".pick()", function () {
    assert(random.pick());
    assert(typeof random.pick().host === "string");
  });

  it(".currentIndex", function () {
    const random = new RoundRobin(weightRandomPool);

    assert(typeof random.currentIndex === "number");
    assert.equal(random.currentIndex, 0);
  });
  
  it("pick ratio is equal to weight ratio", function () {
    const statistics: Record<string, number> = {};
    const loop = 100000;
    let counter: number;

    for (let i = 0; i < loop; i++) {
      const ip = random.pick().host;
      counter = statistics[ip] || 0;
      statistics[ip] = counter + 1;
    }

    const len = randomPool.length;
    const avg = loop / len;
    const expectPer = Number((avg/loop).toFixed(3));

    for(let i = 0; i < len; i++){
      const address = random.pool[i];
      const count = statistics[address];

      const realPer = Number((count/loop).toFixed(3));

      assert.equal(expectPer, realPer);
    } 
  });

  it(".reset()", function () {
    random.reset(weightRandomPool);

    assert.equal(random.pool.length, weightRandomPool.length);
    assert.equal(random.currentIndex, 0);
  });
});