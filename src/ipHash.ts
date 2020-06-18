import { Base } from "./base";
import { PoolType } from "./interface";
import { randomInteger } from "./util";

export class Random extends Base {
  // constructor(pool: PoolType) {
  //   super(pool);
  // }

  // _hash(digest, index) {
  //   const f = ((digest[3 + index * 4] & 0xFF) << 24) |
  //     ((digest[2 + index * 4] & 0xFF) << 16) |
  //     ((digest[1 + index * 4] & 0xFF) << 8) |
  //     (digest[index * 4] & 0xFF);
  //   return f & 0xFFFFFFFF;
  // }

  pick(hash?: string) {
    console.log("====",hash);
    const index = randomInteger(this.pool.length);
    // console.log("pick", this.pool[len]);
    // const { host } = this.pool[len];
    // return "";
    return this.pool[index];
  }
}
