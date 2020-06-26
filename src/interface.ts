export interface AddressInterface {
  host: string;
  weight?: number;
}

export type StandardPoolArrayType = Array<string>
export type PoolListType = Array<AddressInterface>
export type PoolType = StandardPoolArrayType | PoolListType

export interface StandardPropertyInterface {
  pool: Array<string>;
  weightMap: Map<string, number>;
}

export interface PickNodeInterface {
  host: string;
  args?: Array<unknown>;
}