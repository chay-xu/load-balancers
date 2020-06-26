import { Base } from "./base";
import { PickNodeInterface } from "./interface";
import { randomInteger } from "./util";

export class Random extends Base {
  public pick(): PickNodeInterface {
    const index = randomInteger(this.pool.length);

    return {
      host: this.pool[index]
    };
  }
}
