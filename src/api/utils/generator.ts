import { Stock } from '../../shared';
import { Random } from './random';
import { Text } from './text';

export class Generator {

  constructor() {}

  static getStock(list?: Array<string>): Stock {
    const adj: string = Random.getAdjective();
    const type: string = Random.getType();
    const name: string = Random.getName(type);
    const suffix: string = Random.getSuffix();
    const price: number = Random.getDecimal(10, 150);
    list = list || [];
    return {
      name: adj + ' ' + name + suffix,
      initials: Text.getUniqueInitials(adj, name, list).toUpperCase(),
      time: new Date().getTime(),
      type: type,
      volume: Random.getInt(1000, 10000) * 100,
      open: price,
      high: price,
      low: price,
      last: price,
      prev: 0,
      change: 0
    };
  }

  static getStockList(size: number, initials?: Array<string>): Array<Stock> {
    const list: Array<Stock> = [];
    initials = initials || [];
    console.log(initials);
    let tmp: Stock;
    for (let i = 0; i < size; i++) {
      tmp = this.getStock(initials);
      list.push(tmp);
      initials.push(tmp.initials);
    }
    return list;
  }
}
