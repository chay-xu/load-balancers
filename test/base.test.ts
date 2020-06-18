// import { WeightRandom } from "../src/weightedRandom";
import { Base } from "../src/base";
import assert from "assert";

describe("Base class", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  const maxWeight = 10;
  const weightRandomPool = [
    { host: "127.0.0.2:6061", weight: 2 },
    { host: "127.0.0.1:6062", weight: 3 },
    { host: "127.0.0.3:6063", weight: maxWeight },
  ];

  const random = new Base(weightRandomPool);

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

  it(".totalWeight", function () {
    assert(typeof random.totalWeight === "number");
  });

  it(".isWeightSame", function () {
    assert(typeof random.isWeightSame === "boolean");
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

  it(".maxWeight", function () {
    assert(typeof random.maxWeight === "number");
    assert.equal(random.maxWeight, maxWeight);
  });

  it(".pick()", function () {
    try {
      assert(random.pick());
    } catch (err) {
      assert(err instanceof Error);
      assert.strictEqual(err.message, "abstract engine");
    }
  });

  it(".getWeight()", function () {
    const host = weightRandomPool[0].host;
    const weight = weightRandomPool[0].weight;
    // console.log(random.pick());
      assert.equal(random.getWeight(host), weight);
  });
});
