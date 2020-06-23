import { PoolType, StandardPoolType } from "./interface";

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
