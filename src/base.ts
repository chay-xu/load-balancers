// import { parse as urlParse} from "url";
import {
  PoolType,
  AddressInterface,
  StandardPoolArrayType,
  PickNodeInterface,
  StandardPropertyInterface,
} from "./interface";
import { shuffle } from "./util";

interface OptionsInterface {
  defaultWeight: number;
}

// const address = urlParse(`bolt://127.0.0.1:${9000}`, true);
// console.log(address);
const DEFAULT_WEIGHT = 100;

export class Base {
  private _originalPool: PoolType;
  // _pool: StandardPoolType;
  private _pool: StandardPoolArrayType;
  private _weightMap: Map<string, number>;
  defaultWeight: number;
  // pool: PoolType;

  constructor(pool: PoolType, options?: OptionsInterface) {
    const { defaultWeight } = options || {};

    this.defaultWeight = defaultWeight || DEFAULT_WEIGHT;
    this._pool = [];

    this.reset(pool);
  }

  public reset(originalPool: PoolType): StandardPoolArrayType {
    if (!originalPool) return null;

    if (typeof originalPool !== "object" || originalPool.length < 1)
      return null;

    // console.log("original",this._originalPool === originalPool);
    // const newSet: Set<string> = new Set();
    // const oldSet = new Set();

    if (this._originalPool !== originalPool) {
      const prepareData = this._transformPoolToStandard(
        originalPool,
        this.defaultWeight
      );

      // const oldPool = this.pool;
      const newPool = prepareData.pool;

      // for (const host of oldPool) {
      //   oldSet.add(host);
      // }

      // for (const host of newPool) {
      //   if (!oldSet.has(host)) {
      //     newSet.add(host);
      //   }
      // }
      // console.log("newset", newSet, this._updatePool(shuffle(newPool), newSet));
      // const prepareData = this.parse(pool);

      this._originalPool = originalPool;
      this._pool = shuffle(newPool);
      // this._pool = newPool;
      this._weightMap = prepareData.weightMap;

      // shuffle(originalPool);
    }

    return this._pool;
  }

  get pool() {
    return this._pool;
  }

  get size() {
    const len = this.pool.length;

    return len ? len : 0;
  }

  get weightMap() {
    return this._weightMap;
  }

  get originalPool() {
    return this._originalPool;
  }

  private _transformPoolToStandard(
    pool: PoolType,
    defaultWeight: number
  ): StandardPropertyInterface {
    if (pool.length === 0) {
      throw new Error("cannot transform a zero length pool");
    }

    const nodeList: Array<string> = [];
    const weightMap: Map<string, number> = new Map();

    pool.forEach((node: string | AddressInterface) => {
      let realWeight;

      if (typeof node === "object") {
        const { host, weight } = node;

        nodeList.push(host);

        realWeight = weight ? weight : defaultWeight;
        weightMap.set(host, realWeight);
      } else {
        nodeList.push(node);

        realWeight = defaultWeight;
        weightMap.set(node, realWeight);
      }
    });

    return {
      pool: nodeList,
      weightMap,
    };
  }

  public getWeight(address: string): number {
    return this.weightMap.get(address);
  }

  public pick(): PickNodeInterface {
    throw new Error("abstract base class");
  }
}
