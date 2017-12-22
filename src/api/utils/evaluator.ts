import { Stock } from '../../shared';
import { DBStock } from '../db/stock';
import { Random } from './random';

export class Evaluator {

  static evalStock(stock: Stock, timeRef?: number): Stock {
    const tmp: Stock = cloneStock(stock);
    tmp.time = timeRef ? timeRef : tmp.time;
    tmp.change = Random.getDouble(0, 0.2) - 0.1;
    if (tmp.prev !== 0 && tmp.last > tmp.prev) {
      tmp.change = Random.getDouble(0, 0.2) - 0.09;
    }
    if (tmp.prev !== 0 && tmp.last < tmp.prev) {
      tmp.change = Random.getDouble(0, 0.2) - 0.11;
    }
    tmp.change = +tmp.change.toFixed(2);
    tmp.prev = tmp.last;
    tmp.last = +(tmp.last + tmp.change).toFixed(2);
    tmp.high = tmp.last > tmp.high ? tmp.last : tmp.high;
    tmp.low = tmp.last < tmp.low ? tmp.last : tmp.low;
    return tmp;
  }

  static evalList(list: Array<Stock>, time?: number): Array<Stock> {
    const tmp = list.slice();
    time = time ? time : new Date().getTime();
    return tmp.map(stock => this.evalStock(stock, time));
  }

  static evalDB(): void {
    DBStock.find().sort({time: -1}).limit(1)
      .then(doc => {
        return DBStock.find({ time: doc[0].time });
      })
      .then(doc => {
        return DBStock.insertMany(Evaluator.evalList(doc));
      })
      .then(doc => {
        console.log('updated ' + doc.length + ' stocks.');
      });
  }

}

function cloneStock(stock: Stock) {
  return {
    name: stock.name,
    initials: stock.initials,
    time: new Date().getTime(),
    volume: stock.volume,
    high: stock.high,
    low: stock.low,
    open: stock.open,
    close: stock.close,
    last: stock.last,
    prev: stock.prev,
    change: stock.change
  };
}
