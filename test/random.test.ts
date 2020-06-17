/*
 * @Author: caiyu.xu 
 * @Date: 2020-06-12 17:19:50 
 * @Last Modified by: caiyu.xu
 * @Last Modified time: 2020-06-16 17:09:08
 */
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

  it("load balancer", function () {
    const statistics: Record<string, number> = {};

    const loop = 100000;
    let total: number;
    for (let i = 0; i < loop; i++) {
      const ip = random.pick();
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
      // console.log(expectAvg, realAvg);

      // offset 2%
      assert(Math.abs(expectPer - realPer) <= 0.02);
    }
    
  });
});