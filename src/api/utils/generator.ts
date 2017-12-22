import { Stock } from '../../shared';
import { Random } from './random';

export class Generator {

  constructor() {}

  static getStock(): Stock {
    const adj: string = Random.getAdjective();
    const name: string = Random.getName();
    const price: number = Random.getDecimal(10, 150);
    return {
      name: adj + ' ' + name,
      initials: adj.slice(0, 1).toUpperCase() + name.slice(0, 1).toUpperCase(),
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
    for (let i = 0; i < size; i++) {
      list.push(this.getStock());
    }
    return list;
  }
}
