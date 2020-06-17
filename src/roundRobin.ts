/*
 * @Author: caiyu.xu 
 * @Date: 2020-06-12 15:41:33 
 * @Last Modified by: caiyu.xu
 * @Last Modified time: 2020-06-16 20:00:00
 */
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
