import { Base } from "./base";
// import { PoolType } from "./interface";

export class RoundRobin extends Base {
  currentIndex: number;

  reset(){
    this.currentIndex = 0;
  }

  pick() {
    const address = this.pool[this.currentIndex++];

    const len = this.size;
    this.currentIndex = this.currentIndex % len;
    
    return address;
  }
}
