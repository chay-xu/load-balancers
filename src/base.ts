// import { parse as urlParse} from "url";
import { PoolType, AddressInterface, StandardPoolType } from "./interface";
import { shuffle } from "./util";

interface OptionsInterface {
  defaultWeight: number;
}

// const address = urlParse(`bolt://127.0.0.1:${9000}`, true);
// console.log(address);
const DEFAULT_WEIGHT = 100;

export class Base  {
  private _originalPool: PoolType;
  // _pool: StandardPoolType;
  private _pool: Array<string>;
  private _weightMap: Map<string, number>;
  private _totalWeight: number;
  private _isWeightSame: boolean;
  private _maxWeight: number;
  defaultWeight: number;
  // pool: PoolType;
  // addressMap: Map<string, number>;

  // public pick(hash?: string): string {
  //   return "";
  // }

  constructor(pool: PoolType, options?: OptionsInterface) {
    const { defaultWeight } = options || {};

    this.defaultWeight = defaultWeight || DEFAULT_WEIGHT;

    this.setPool(pool);
    this.reset();
  }

  setPool(originalPool: PoolType) {
    if (!originalPool) {
      return;
    }

    if (this._originalPool !== originalPool) {
      // console.log("---");
      // shuffle(originalPool);
    }
    // console.log("===",shuffle(originalPool));

    const prepareData = this._transformPoolToStandard(originalPool, this.defaultWeight);
// console.log(prepareData);
    // const prepareData = this.parse(pool);

    this._originalPool = originalPool;
    this._pool = prepareData.addressList;
    this._weightMap = prepareData.weightMap;
    this._totalWeight = prepareData.totalWeight;
    this._isWeightSame = prepareData.isWeightSame;
    this._maxWeight = prepareData.maxWeight;
  }

  get pool() {
    return this._pool;
  }

  get size(){
    const len = this.pool.length;

    return len ? len : 0;
  }

  get weightMap() {
    return this._weightMap;
  }

  get totalWeight() {
    return this._totalWeight;
  }

  get isWeightSame() {
    return this._isWeightSame;
  }

  get maxWeight() {
    return this._maxWeight;
  }

  private _transformPoolToStandard(pool: PoolType, defaultWeight: number) {
    if (pool.length === 0) {
      throw new Error("cannot transform a zero length pool");
    }
  
    const addressList: Array<string> = [];
    const weightMap: Map<string, number> = new Map();
  
    let totalWeight = 0;
    let isWeightSame = true;
    let maxWeight = 0;
  
    pool.forEach((node: string | AddressInterface, index: number) => {
      // console.log(item);
      let realWeight;
  
      if (typeof node === "object") {
        const { host, weight } = node;
  
        addressList.push(host);
  
        realWeight = weight ? weight : defaultWeight;
        weightMap.set(host, realWeight);
  
        if (index > 0) {
          const prevWeight = (pool[index - 1] as AddressInterface).weight;
  
          if (weight !== prevWeight) {
            isWeightSame = false;
          }
  
          maxWeight = Math.max(weight, prevWeight);
        }
      } else {
        addressList.push(node);
  
        realWeight = defaultWeight;
        weightMap.set(node, realWeight);
      }
  
      totalWeight += realWeight;
    });
  
    return {
      addressList,
      weightMap,
      totalWeight,
      isWeightSame,
      maxWeight
    };
  }

  public getWeight(address: string) {
    return this.weightMap.get(address);
  }

  public reset(){
    // return {};
  }

  public pick(): string {
    throw new Error("abstract engine");
  }

  // /**
  //  *
  //  * @param pool
  //  */
  // update(originalPool: PoolType){

  // }

  // refresh(pool: PoolType){
  //   if(!pool){
  //     return;
  //   }

  //   if(){

  //   }
  //   transformPoolToStandard
  // }

  // getWeight(address: string) {
  //   console.log(address);
  //   return 123;
  // }
}
