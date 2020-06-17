/*
 * @Author: caiyu.xu 
 * @Date: 2020-06-08 11:00:02 
 * @Last Modified by: caiyu.xu
 * @Last Modified time: 2020-06-16 16:35:24
 */
import { Base } from "./base";
import { PoolType } from "./interface";
import { randomInteger } from "./util";

export class Random extends Base {
  constructor(pool: PoolType) {
    super(pool);
  }

  pick() {
    // console.log("====",this.pool);
    const index = randomInteger(this.pool.length);
    // console.log("pick", this.pool[len]);
    // const { host } = this.pool[len];
    // return "";
    return this.pool[index];
  }
}
