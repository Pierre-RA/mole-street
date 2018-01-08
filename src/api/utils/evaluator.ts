import * as moment from 'moment';

import { Quote, QuarterlyQuote, DailyIndicator, DailyQuote } from '../../shared';
import { DBStock, DBIndicator } from '../db';
import { Random } from './random';
import { Text } from './text';

/**
 * class Evaluator
 */
export class Evaluator {

  /**
   * evalFirst(): void
   * Eval stocks when the server launch
   */
  static evalFirst(): void {
    // Get all latest stocks
    DBStock.aggregate([{
      $sort: { symbol: 1, date: -1}
    }, {
      $group: {
        _id: '$symbol',
        name: {$first: '$name'},
        symbol: {$first: '$symbol'},
        date: {$first: '$date'},
        hours: {$first: '$hours'}
      }
    }])
      .then(doc => {
        // Clone stocks older than today
        let clones: Array<DailyQuote>;
        clones = [];
        doc.forEach((stock: DailyQuote) => {
          // Stock is older, clone it
          if (moment(stock.date).isBefore(moment(), 'day')) {
            clones.push(cloneStock(stock));
          }
        });
        return DBStock.insertMany(clones);
      })
      .then(doc => {
        console.log('*** evalFirst *** ' + doc.length + ' quotes have been updated');
        return DBIndicator.aggregate([{
          $sort: { symbol: 1, date: -1}
        }, {
          $group: {
            _id: '$symbol',
            name: {$first: '$name'},
            symbol: {$first: '$symbol'},
            date: {$first: '$date'},
            indicators: {$first: '$indicators'},
            amount: {$first: '$amount'},
            hours: {$first: '$hours'}
          }
        }]);
      })
      .then(doc => {
        // Clone indicators older than today
        let clones: Array<DailyIndicator>;
        clones = [];
        doc.forEach((indicator: DailyIndicator) => {
          // Indicator is older, clone it
          if (moment(indicator.date).isBefore(moment(), 'day')) {
            clones.push(cloneIndicator(indicator));
          }
        });
        return DBIndicator.insertMany(clones);
      })
      .then(doc => {
        console.log('*** evalFirst *** ' + doc.length + ' indicators have been updated');
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * evalQuarterly(): void
   * Eval during the day
   */
  static evalQuarterly(): void {
    const time = moment();
    const hour = time.get('hours').valueOf();
    const quarter = Math.floor(time.get('minutes').valueOf() / 15);
    const day = time.startOf('day');
    const quarterly = 'hours.' + hour + '.' + quarter;
    const lastQuarter = quarter - 1 < 0 ? 3 : quarter - 1;
    const lastHour = quarter === 3 ? hour - 1 : hour;
    let indicators: Array<DailyIndicator>;
    indicators = [];
    DBIndicator.find({ date: day })
      .then(doc => {
        indicators = doc;
        return DBStock.find({ date: day});
      })
      .then(doc => {
        const bulk = DBStock.collection.initializeOrderedBulkOp();
        doc.forEach(quote => {
          bulk.find({ _id: quote.id })
            .updateOne({
              $set: {
                [quarterly]: evalQuarterly(quote.hours[lastHour][lastQuarter])
              }
            });
        });
        return bulk.execute();
      })
      .then(doc => {
        console.log('ok', doc);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

/**
 * evalQuarterly(quote: QuarterlyQuote): QuarterlyQuote
 */
function evalQuarterly(quote: QuarterlyQuote): QuarterlyQuote {
  const tmp = 10;
  return {
    volume: quote.volume,
    open: quote.open,
    high: tmp > quote.high ? tmp : quote.high,
    low: tmp < quote.low ? tmp : quote.low,
    last: tmp,
    prev: quote.last,
    change: 0
  };
}

/**
 * cloneStock(stock: DailyQuote): DailyQuote
 * Clone stock with a new date set as today
 */
function cloneStock(stock: DailyQuote): DailyQuote {
  let result: DailyQuote;
  const time = moment();
  const hour = time.get('hours').valueOf();
  const quarter = Math.floor(time.get('minutes').valueOf() / 15);
  result = {
    name: stock.name,
    symbol: stock.symbol,
    date: moment().startOf('day').toString(),
    indicators: stock.indicators,
    amount: stock.amount,
    hours: Text.getEmptyHours()
  };
  const last = getLastQuote(stock);
  result.hours[8][0] = last;
  result.hours[hour][quarter] = last;
  return result;
}

/**
 * cloneIndicator(indicator: DailyIndicator): DailyIndicator
 * Clone indicator with a new date set as today
 */
function cloneIndicator(indicator: DailyIndicator): DailyIndicator {
  let result: DailyIndicator;
  const time = moment();
  const hour = time.get('hours');
  const quarter = Math.floor(time.get('minutes') / 15);
  result = {
    name: indicator.name,
    symbol: indicator.symbol,
    date: moment().startOf('day').toString(),
    hours: Text.getEmptyHours()
  };
  const last = getLastQuote(indicator);
  result.hours[8][0] = last;
  result.hours[hour][quarter] = last;
  return result;
}

/**
 * getLastQuote(quote: Quote): QuarterlyQuote
 */
function getLastQuote(quote: Quote): QuarterlyQuote {
  let last: QuarterlyQuote;
  for (let i = 8; i < 17; i++) {
    for (let j = 0; j < 4; j++) {
      if (quote.hours[i][j]) {
        last = quote.hours[i][j];
      }
    }
  }
  return last;
}

/*
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
*/

function getClimb(cliff?: number) {
  const luck = Math.random();
  cliff = cliff || 0.85;
  if (luck < cliff) {
    return Random.getDouble(0, 0.2) - 0.05;
  }
  return Random.getDouble(0, 0.2) - 0.15;
}

