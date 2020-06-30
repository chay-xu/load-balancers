import { Base } from "./base";
import { PoolType, StandardPoolArrayType, PickNodeInterface } from "./interface";

export class RoundRobin extends Base {
  currentIndex: number;

  public reset(pool: PoolType): StandardPoolArrayType {
    const nodeList = super.reset(pool);
    this.currentIndex = 0;

    return nodeList;
  }

  public pick(): PickNodeInterface {
    const address = this.pool[this.currentIndex];

    const len = this.size;
    this.currentIndex = (this.currentIndex + 1) % len;
    
    return {
      host: address
    };
  }
}
