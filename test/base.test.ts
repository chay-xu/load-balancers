// import { WeightRandom } from "../src/weightedRandom";
import { Base } from "../src/base";
import assert from "assert";
// import { Random } from "../src/random";

describe("Base class", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  const weightRandomPool = [
    { host: "127.0.0.2:6061", weight: 2 },
    { host: "127.0.0.1:6062", weight: 3 },
    { host: "127.0.0.3:6063", weight: 10 },
  ];

  const random = new Base(weightRandomPool);

  it("empty pool", function () {
    assert(new Base([]));
  });

  it("not weight property", function () {
    const random = new Base(randomPool);

    assert.ok(random.pool);
    assert.ok(typeof random.pool === "object");
  });

  // it("should return object from the pool", function () {
  //   // const random = new Random(randomPool);
  //   // console.log(random.pick());
  //   assert.ok(random.pool);
  //   assert.ok(typeof random.pool === "object");
  // });

  it(".pool", function () {
    assert(random.pool);
    assert(typeof random.pool === "object");
  });

  it(".size", function () {
    assert.equal(weightRandomPool.length, random.size);
  });

  it(".weightMap", function () {
    // console.log(random.weightMap);
    const host = weightRandomPool[0].host;
    const weight = weightRandomPool[0].weight;

    assert(typeof random.weightMap === "object");
    assert(random.weightMap.has(host));
    assert.equal(random.weightMap.get(host), weight);
    assert.equal(random.weightMap.size, weightRandomPool.length);
  });

  it(".pick()", function () {
    try {
      assert(random.pick());
    } catch (err) {
      assert(err instanceof Error);
      // assert.strictEqual(err.message, "abstract engine");
    }
  });

  it(".getWeight()", function () {
    const host = weightRandomPool[0].host;
    const weight = weightRandomPool[0].weight;

    assert.equal(random.getWeight(host), weight);
  });

  it(".reset()", function () {
    const compareRandom = new Base(weightRandomPool);

    assert.equal(random.reset(weightRandomPool).length, compareRandom.pool.length);
  });
  
});
