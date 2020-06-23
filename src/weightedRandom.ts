import { Base } from "./base";
// import { AddressInterface } from "./interface";
import { randomInteger } from "./util";

// interface AddressListInterface {
//   [key: string]: number;
// }

export class WeightRandom extends Base {
  pick() {
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
    }else{
      const index = randomInteger(len);
      address = pool[index];
    }

    return {
      host: address
    };
  }
}
