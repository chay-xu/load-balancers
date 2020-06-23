import LB, { WeightRandom } from "../src/index";
import assert from "assert";


describe("index", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  const weightRandomPool = [
    { host: "127.0.0.2:6061", weight: 2 },
    { host: "127.0.0.1:6062", weight: 3 },
    { host: "127.0.0.3:6063", weight: 10 },
  ];

  it("export default", function () {
    const random = new LB.WeightedRoundRobin(weightRandomPool);

    assert(random.pick());
    assert(typeof random.pick().host === "string");
  });

  it("export", function () {
    const random = new WeightRandom(randomPool);

    assert(random.pick());
    assert(typeof random.pick().host === "string");
  });
});
