import { Base } from "./base";
import {
  PoolType,
  StandardPoolArrayType,
  PickNodeInterface,
} from "./interface";
// import { randomInteger } from "./util";

export class WeightedRoundRobin extends Base {
  currentIndex: number;
  gcdWeight: number;
  currentWeight: number;
  maxWeight: number;

  public reset(pool: PoolType): StandardPoolArrayType {
    const nodeList = super.reset(pool);
    this.currentIndex = -1;
    this.currentWeight = 0;
    this.gcdWeight = this.gcd(...this.weightMap.values());
    // console.log("gcdWeight",this.gcdWeight);
    let maxWeight = 0;

    nodeList.forEach((host: string) => {
      const weight = this.getWeight(host);

      maxWeight = Math.max(maxWeight, weight);
    });

    this.maxWeight = maxWeight;

    return nodeList;
  }

  private gcd(...arr: number[]): number {
    // Euclidean Algorithm
    const data = [].concat(...arr);

    const helperGcd = (x: number, y: number) => {
      return !y ? x : this.gcd(y, x % y);
    };

    return data.reduce((a, b) => helperGcd(a, b));
  }

  public pick(): PickNodeInterface {
    while (true) {
      this.currentIndex = (this.currentIndex + 1) % this.size;

      if (this.currentIndex == 0) {
        this.currentWeight = this.currentWeight - this.gcdWeight;

        if (this.currentWeight <= 0) {
          this.currentWeight = this.maxWeight;

          if (this.currentWeight == 0) return null;
        }
      }

      const address = this.pool[this.currentIndex];

      if (this.getWeight(address) >= this.currentWeight) {
        return {
          host: address,
        };
      }
    }
  }
}
