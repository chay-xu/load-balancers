import { Base } from "./base";
// import { PoolType } from "./interface";
import { randomInteger } from "./util";

export class Random extends Base {
  pick() {
    const index = randomInteger(this.pool.length);
    // console.log("pick", this.pool[len]);
    // const { host } = this.pool[len];
    // return "";
    return {
      host: this.pool[index]
    };
  }
}
