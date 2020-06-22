export interface AddressInterface {
  host: string;
  weight?: number;
}

export type StandardPoolType = Array<AddressInterface>

export type PoolType = Array<string> | StandardPoolType

export interface StandardProperty {
  pool: Array<string>;
  weightMap: Map<string, number>;
  totalWeight: number;
  isWeightSame: boolean;
  maxWeight: number;
}