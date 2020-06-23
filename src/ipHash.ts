import crypto from "crypto";
import { Base } from "./base";
import { PoolType } from "./interface";
// import { randomInteger } from "./util";

const NUM = 128;

export class IpHash extends Base {
  private _virtualNodes: Map<number, string>;
  private _sortKeys: Array<number>;

  reset(pool: PoolType) {
    const nodeList = super.reset(pool);
    this._virtualNodes = new Map();

    if (nodeList) {
      for (const address of nodeList) {
        for (let i = 0; i < NUM / 4; i++) {
          const digest = this._digest(`${address}${i}`);
          
          for (let h = 0; h < 4; h++) {
            // virtual nodes
            const m = this._hash(digest, h);
            this._virtualNodes.set(m, address);
          }
        }
      }
    }

    this._sortKeys = Array.from(this._virtualNodes.keys()).sort(
      (a, b) => a - b
    );
    return nodeList;
  }

  private _hash(digest: string, index: number) {
    const f =
      (((digest[3 + index * 4] as unknown) as number & 0xff) << 24) |
      (((digest[2 + index * 4] as unknown) as number & 0xff) << 16) |
      (((digest[1 + index * 4] as unknown) as number & 0xff) << 8) |
      ((digest[index * 4] as unknown) as number & 0xff);

    // console.log(digest[3 + index * 4], f);
    return f & 0xffffffff;
  }

  private _digest(value: string): string {
    const md5 = crypto.createHash("md5");

    return md5.update(value, "utf8").digest("hex").toString();
  }

  private _selectForKey(hash: number) {
    const len = this._sortKeys.length;
    let key = this._sortKeys[0];

    if (this._sortKeys[len - 1] >= hash) {
      for (let i = len - 1; i >= 0; i--) {
        if (this._sortKeys[i] < hash) {
          key = this._sortKeys[i + 1];
          break;
        }
      }
    }

    return this._virtualNodes.get(key);
  }

  private _buildKeyOfHash(args: Array<unknown>) {
    if (!args || !args.length) return "";
    return JSON.stringify(args[0]);
  }

  pick(args?: Array<unknown>) {
    const key = this._buildKeyOfHash(args);
    // console.log(Array.from(this._virtualNodes.keys()).sort());
    const digest = this._digest(key);

    return {
      host: this._selectForKey(this._hash(digest, 0)),
      args
    };
  }
}
