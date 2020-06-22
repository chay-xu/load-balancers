import { IpHash } from "../src/ipHash";
import assert from "assert";
// import chai from "chai";


describe("IP Hash", function () {
  const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];
  // const randomPool = ["127.0.0.1", "127.0.0.3"];
  const weightRandomPool = [
    { host: "127.0.0.2", weight: 2 },
    { host: "127.0.0.1", weight: 3 },
    { host: "127.0.0.3", weight: 10 },
  ];

  const random = new IpHash(randomPool);

  it("has weight property", function () {
    const random = new IpHash(weightRandomPool);

    assert(random.pool);
    assert(typeof random.pool === "object");
  });

  it(".pick()", function () {
    const ip = random.pick().host;

    assert(ip);
    assert(typeof ip === "string");
  });

  it("hash must be equal", function () {
    const loop = 100;
    
    for (let i = 0; i < loop; i++) {
      const node = random.pick([`test${i}`]);
      const ip = node.host;
      // total = statistics[ip] || 0;
      // statistics[ip] = total + 1;

      for (let i = 0; i < 100; i++) {
        assert(random.pick(node.args).host === ip);
      }
      // console.log(random.pick(node.args).host === ip);
    }
    // console.log(statistics, weightRandomPool.length);

    for (let i = 0; i < loop; i++) {
      const node = random.pick(["test"]);
      const ip = node.host;
      // total = statistics[ip] || 0;
      // statistics[ip] = total + 1;
      assert(random.pick(node.args).host === ip);
    }
  });
});