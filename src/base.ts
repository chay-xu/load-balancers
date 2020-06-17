/*
 * @Author: caiyu.xu
 * @Date: 2020-06-08 10:59:41
 * @Last Modified by: caiyu.xu
 * @Last Modified time: 2020-06-17 17:12:55
 */
// import { parse as urlParse} from "url";
import { PoolType, StandardPoolType } from "./interface";
import { transformPoolToStandard, shuffle } from "./util";

interface OptionsInterface {
  defaultWeight: number;
}

// const address = urlParse(`bolt://127.0.0.1:${9000}`, true);
// console.log(address);
const DEFAULT_WEIGHT = 100;

export class Base  {
  // export class Base{
  _originalPool: PoolType;
  // _pool: StandardPoolType;
  _pool: Array<string>;
  _weightMap: Map<string, number>;
  defaultWeight: number;
  _totalWeight: number;
  _isWeightSame: boolean;
  _maxWeight: number;
  // pool: PoolType;
  // addressMap: Map<string, number>;

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

    const prepareData = transformPoolToStandard(originalPool, this.defaultWeight);
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

  getWeight(address: string) {
    return this.weightMap.get(address);
  }

  reset(){
    // return {};
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

  pick() {
    throw new Error("abstract engine");
  }

  // getWeight(address: string) {
  //   console.log(address);
  //   return 123;
  // }
}
