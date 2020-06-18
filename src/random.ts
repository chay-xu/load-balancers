import { Base } from "./base";
// import { PoolType } from "./interface";
import { randomInteger } from "./util";

export class Random extends Base {
  // constructor(pool: PoolType) {
  //   super(pool);
  // }

  pick(): string {
    // console.log("====",this.pool);
    const index = randomInteger(this.pool.length);
    // console.log("pick", this.pool[len]);
    // const { host } = this.pool[len];
    // return "";
    return this.pool[index];
  }
}
