import { PoolType, StandardPoolType, AddressInterface } from "./interface";

export function randomInteger(lower: number, upper?: number) {
  if (lower === undefined && upper === undefined) {
    return 0;
  }

  if (upper === undefined) {
    upper = lower;
    lower = 0;
  }

  let temp;
  if (lower > upper) {
    temp = lower;
    lower = upper;
    upper = temp;
  }

  return Math.floor(lower + Math.random() * upper);
}

export function prepareWeights(pool: StandardPoolType) {
  // if (pool.length === 0) {
  //   throw new Error("cannot prepare a zero length pool");
  // }

  // pool.sort((a, b) => {
  //   return b.weight - a.weight;
  // });

  // let totalWeight = 0;
  // let isWeightSame = true;

  pool.forEach((entry, index) => {
    const { host, weight } = entry;

    // let object;

    if (host === undefined || host === null) {
      throw new Error("Please specify an object");
    }

    if (weight <= 0) {
      throw new Error(`Weight in index ${index} must be greater than zero`);
    }

    if (weight % 1 !== 0) {
      throw new Error(`Weight in index ${index} must be an integer`);
    }

    // totalWeight += weight;

    // if (index > 0 && weight !== this.getWeight(pool[index - 1])) {
    //   isWeightSame = false;
    // }
  });

  return pool;
}

// export function transformPoolToStandard(pool: PoolType, defaultWeight: number) {
//   if (pool.length === 0) {
//     throw new Error("cannot transform a zero length pool");
//   }

//   const addressList: Array<string> = [];
//   const weightMap: Map<string, number> = new Map();

//   let totalWeight = 0;
//   let isWeightSame = true;
//   let maxWeight = 0;

//   pool.forEach((node: string | AddressInterface, index: number) => {
//     // console.log(item);
//     let realWeight;

//     if (typeof node === "object") {
//       const { host, weight } = node;

//       addressList.push(host);

//       realWeight = weight ? weight : defaultWeight;
//       weightMap.set(host, realWeight);

//       if (index > 0) {
//         const prevWeight = (pool[index - 1] as AddressInterface).weight;

//         if (weight !== prevWeight) {
//           isWeightSame = false;
//         }

//         maxWeight = Math.max(weight, prevWeight);
//       }
//     } else {
//       addressList.push(node);

//       realWeight = defaultWeight;
//       weightMap.set(node, realWeight);
//     }

//     totalWeight += realWeight;
//   });

//   return {
//     addressList,
//     weightMap,
//     totalWeight,
//     isWeightSame,
//     maxWeight
//   };

//   // const metadata = pool[0];

//   // if(typeof metadata === "object"){
//   //   return pool as StandardPoolType;
//   // }

//   // return (pool as Array<string>).map((host: string) => {
//   //   return {
//   //     host
//   //   };
//   // });
// }

export function shuffle(list: PoolType) {
  let n = list.length;
  let random;
  // console.log(list.length);
  while (n) {
    // console.log((Math.random() * n--) >>> 0, n);
    random = (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
    [list[n], list[random]] = [list[random], list[n]]; // ES6的结构赋值实现变量互换
  }

  return list;
}
