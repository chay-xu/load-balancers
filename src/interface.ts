/*
 * @Author: caiyu.xu 
 * @Date: 2020-06-08 10:59:32 
 * @Last Modified by: caiyu.xu
 * @Last Modified time: 2020-06-11 15:51:36
 */
export interface AddressInterface {
  host: string;
  weight?: number;
}

// export interface BaseInterface {
//   _originalPool: PoolType;
//   // _pool: StandardPoolType;
//   // _pool: Set<string>;
//   pool: Array<string>;
//   // pool: Set<string>;
//   // addressMap: Map<string, number>;
//   pick(): object | string;
// }

export type StandardPoolType = Array<AddressInterface>

export type PoolType = Array<string> | StandardPoolType