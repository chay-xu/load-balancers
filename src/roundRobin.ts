import { Base } from "./base";
import { PoolType } from "./interface";

export class RoundRobin extends Base {
  currentIndex: number;

  reset(pool: PoolType) {
    const nodeList = super.reset(pool);
    this.currentIndex = 0;

    return nodeList;
  }

  pick() {
    const address = this.pool[this.currentIndex++];

    const len = this.size;
    this.currentIndex = this.currentIndex % len;
    
    return {
      host: address
    };
  }
}
