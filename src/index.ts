/*
 * @Author: caiyu.xu
 * @Date: 2020-06-08 10:59:51
 * @Last Modified by: caiyu.xu
 * @Last Modified time: 2020-06-12 17:18:06
 */
// 'use strict';

import { Random } from "./random";
import { WeightRandom } from "./weightRandom";
import { RoundRobin } from "./roundRobin";

// console.log(path);

// const nodes = ["A", "B", "C"];
// const choices = [];
// let n = 0;

// for (_ in range(10)){
//   index = n % len(nodes);
//   choices.append(nodes[index]);
//   n += 1;
// }
// const ar = Array(8);
// console.log(ar);
// ar.forEach((item)=>{
//   console.log(item);
// });

const randomPool = ["127.0.0.1", "127.0.0.3", "127.0.0.2", "127.0.0.4"];

const weightRandomPool = [
  { host: "127.0.0.2", weight: 2 },
  { host: "127.0.0.1", weight: 3 },
  { host: "127.0.0.3", weight: 10 },
];

const random = new Random(randomPool);

console.log(random, random.pick());

const weightRandom = new WeightRandom(weightRandomPool);

console.log();
console.log(weightRandom);

const statistics: Record<string, number> = {};

const loop = 100;
let counter;
for (let i = 0; i < loop; i++) {
  const ip = weightRandom.pick();
  counter = statistics[ip] || 0;
  statistics[ip] = counter + 1;
}
console.log(statistics);

const roundRobin = new RoundRobin(weightRandomPool);

console.log();
console.log(roundRobin, roundRobin.pick());

export {
  Random,
  WeightRandom
};
