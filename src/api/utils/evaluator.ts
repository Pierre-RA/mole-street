import { Stock } from '../../shared';
import { DBStock } from '../db/stock';
import { Random } from './random';

export class Evaluator {

  static evalStock(stock: Stock, timeRef?: number): Stock {
    const tmp: Stock = cloneStock(stock);
    tmp.time = timeRef ? timeRef : tmp.time;
    tmp.change = Random.getDouble(0, 0.2) - 0.1;
    if (tmp.prev !== 0 && tmp.last > tmp.prev) {
      tmp.change = getClimb(0.85);
    }
    if (tmp.prev !== 0 && tmp.last < tmp.prev) {
      tmp.change = getClimb(0.15);
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
    DBStock.aggregate([{
      $sort: { initials: 1, time: -1}
    }, {
      $group: {
        _id: '$initials',
        name: {$first: '$name'},
        type: {$first: '$type'},
        initials: {$first: '$initials'},
        time: {$first: '$time'},
        volume: {$first: '$volume'},
        high: {$first: '$high'},
        low: {$first: '$low'},
        open: {$first: '$open'},
        last: {$first: '$last'},
        prev: {$first: '$prev'},
        change: {$first: '$change'},
      }
    }])
      .then((doc: Array<Stock>) => {
        return DBStock.insertMany(Evaluator.evalList(doc));
      })
      .then(doc => {
        console.log(doc.length + ' have been updated.');
      })
      .catch(err => {
        console.error('something wrong happened:', err);
      });
  }

}

function getClimb(cliff?: number) {
  const luck = Math.random();
  cliff = cliff || 0.85;
  if (luck < cliff) {
    return Random.getDouble(0, 0.2) - 0.05;
  }
  return Random.getDouble(0, 0.2) - 0.15;
}

function cloneStock(stock: Stock) {
  return {
    name: stock.name,
    initials: stock.initials,
    type: stock.type,
    time: new Date().getTime(),
    volume: stock.volume,
    high: stock.high,
    low: stock.low,
    open: stock.open,
    last: stock.last,
    prev: stock.prev,
    change: stock.change
  };
}
