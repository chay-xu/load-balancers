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