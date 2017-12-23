import { Stock } from '../../shared';
import { Random } from './random';
import { Text } from './text';

export class Generator {

  constructor() {}

  static getStock(list?: Array<string>): Stock {
    const adj: string = Random.getAdjective();
    const name: string = Random.getName();
    const price: number = Random.getDecimal(10, 150);
    list = list ? list : [];
    return {
      name: adj + ' ' + name,
      initials: Text.getUniqueInitials(adj, name, list).toUpperCase(),
      time: new Date().getTime(),
      volume: Random.getInt(10000, 1000000),
      open: price,
      close: 0,
      high: price,
      low: price,
      last: price,
      prev: 0,
      change: 0
    };
  }

  static getStockList(size: number): Array<Stock> {
    const list: Array<Stock> = [];
    const initials: Array<string> = [];
    let tmp: Stock;
    for (let i = 0; i < size; i++) {
      tmp = this.getStock(initials);
      list.push(tmp);
      initials.push(tmp.initials);
    }
    return list;
  }
}
