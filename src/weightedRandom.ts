import { Base } from "./base";
import { PoolType, StandardPoolArrayType, PickNodeInterface } from "./interface";
import { randomInteger } from "./util";

// interface AddressListInterface {
//   [key: string]: number;
// }

export class WeightRandom extends Base {
  totalWeight: number;
  isWeightSame: boolean;
  
  reset(pool: PoolType): StandardPoolArrayType {
    const nodeList = super.reset(pool);

    let totalWeight = 0;
    let isWeightSame = true;

    nodeList.forEach((host: string, index: number) => {
      const weight = this.getWeight(host);

      if (index > 0) {
        const prevWeight = this.getWeight(nodeList[index - 1]);

        if (weight !== prevWeight) {
          isWeightSame = false;
        }
      }

      totalWeight += weight;
    });

    this.totalWeight = totalWeight;
    this.isWeightSame = isWeightSame;

    return nodeList;
  }

  public pick(): PickNodeInterface {
    const { pool, totalWeight, isWeightSame } = this;
    const len = pool.length;
    let address;

    // return this.pool[len].host;
    if (totalWeight > 0 && !isWeightSame) {
      let offset = randomInteger(totalWeight);
      for (let i = 0; i < len; i++) {
        offset -= this.getWeight(pool[i]);
        if (offset < 0) {
          address = pool[i];
          break;
        }
      }
    } else {
      const index = randomInteger(len);
      address = pool[index];
    }

    return {
      host: address,
    };
  }
}
