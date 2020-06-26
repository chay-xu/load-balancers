import { StandardPoolArrayType } from "./interface";

export function randomInteger(lower: number, upper?: number): number {
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

export function shuffle(list: StandardPoolArrayType): StandardPoolArrayType {
  let n = list.length;
  let random;

  while (n) {
    random = (Math.random() * n--) >>> 0; // unsigned integer
    [list[n], list[random]] = [list[random], list[n]];
  }

  return list;
}
