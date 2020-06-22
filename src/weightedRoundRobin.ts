import { Base } from "./base";
import { PoolType } from "./interface";
// import { randomInteger } from "./util";

export class WeightedRoundRobin extends Base {
  currentIndex: number;
  // offset: number;
  gcdWeight: number;
  currentWeight: number;

  reset(pool: PoolType) {
    const nodeList = super.reset(pool);
    this.currentIndex = -1;
    this.currentWeight = 0;

    this.gcdWeight = this.gcd(...this.weightMap.values());
    // console.log("gcdWeight",this.gcdWeight);

    return nodeList;
  }

  gcd(...arr: number[]): number {
    // Euclidean Algorithm
    const data = [].concat(...arr);

    const helperGcd = (x: number, y: number) => {
      return !y ? x : this.gcd(y, x % y);
    };

    return data.reduce((a, b) => helperGcd(a, b));
  }

  pick() {
    // let address;
    // const count = this.size;
    // while (count--) {
    //   address = this.rr();
    //   if (address) return address;
    // }

    while (true) {
      // console.log("currentIndex", this.currentIndex, this.maxWeight, this.gcdWeight);
      this.currentIndex = (this.currentIndex + 1) % this.size;
      
      if (this.currentIndex == 0) {
        this.currentWeight = this.currentWeight - this.gcdWeight;

        if (this.currentWeight <= 0) {
          this.currentWeight = this.maxWeight;
          
          if (this.currentWeight == 0) return null;
        }
      }
      const address = this.pool[this.currentIndex];
      // console.log(this.getWeight(address), this.currentWeight);

      if (this.getWeight(address) >= this.currentWeight) {
        return {
          host: address
        };
      }
    }

    // const address = this.pool[this.currentIndex++];

    // const len = this.size;
    // this.currentIndex = this.currentIndex % len;

    // return address;
    // return this.pool[this.offset];
  }
}
