import { Base } from "./base";
// import { AddressInterface } from "./interface";
import { randomInteger } from "./util";

// interface AddressListInterface {
//   [key: string]: number;
// }

export class WeightRandom extends Base {
  // getWeight(): number;
  // constructor(pool: Array<object:{}>){
  //   super(pool);
  // }

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

    return address;
  }

  // getWeight(address: string) {
  //   return this.weightMap.get(address);
  // }

  // select(addressList: Array<string>) {
  //   const len = addressList.length;
  //   let totalWeight = 0;
  //   let isWeightSame = true;
  //   let address;

  //   for (let i = 0; i < len; i++) {
  //     const weigit = super.getWeight(addressList[i]);
  //     totalWeight += weigit;
  //     if (
  //       isWeightSame &&
  //       i > 0 &&
  //       weigit !== super.getWeight(addressList[i - 1])
  //     ) {
  //       isWeightSame = false;
  //     }
  //   }

  //   if (totalWeight > 0 && !isWeightSame) {
  //     let offset = RandomInt(totalWeight);
  //     for (let i = 0; i < len; i++) {
  //       offset -= super.getWeight(addressList[i]);
  //       if (offset < 0) {
  //         address = addressList[i];
  //         break;
  //       }
  //     }
  //   } else {
  //     const index = RandomInt(len); // math.randomInt(len);
  //     address = addressList[index];
  //   }

  //   return address;
  // }
}
