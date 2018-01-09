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
        console.log('*** info    *** ' + doc.length + ' quotes have been updated');
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
        console.log('*** info    *** ' + doc.length + ' indicators have been updated');
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
    let update;
    update = {};
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
          bulk.find({ symbol: quote.symbol }).update({ $set: {
            [quarterly]: evalQuarterly(getLastQuote(quote))
          }});
        });
        return bulk.execute();
      })
      .then(() => {
        // return DBStock.find({ date: day });
      })
      // .then(doc => {
      //   let tmp;
      //   doc.forEach(quote => {
      //     tmp = quote.hours[hour][quarter];
      //     quote.indicators.forEach(indicator => {
      //       // TODO: complete
      //     });
      //   });
      // })
      .catch(err => {
        console.error(err);
      });
  }
}

/**
 * evalQuarterly(quote: QuarterlyQuote): QuarterlyQuote
 */
function evalQuarterly(quote: QuarterlyQuote): QuarterlyQuote {
  let range = 0.2;
  let axis = 0.1;
  let luck = 0.5;

  // Positive outcome
  if (quote.prev !== 0 && quote.last > quote.prev) {
    luck = 0.15;
  }

  // Negative outcome
  if (quote.prev !== 0 && quote.last > quote.prev) {
    luck = 0.85;
  }

  // Luck intervention
  const rand = Math.random();
  if (rand > luck) {
    axis = 0.15;
  } else {
    axis = 0.05;
  }

  // Critical range
  if (rand > 0.95 || rand < 0.05) {
    range *= 2;
    axis *= 2;
  }

  // Get new value
  const change = Random.getDouble(0, range) - axis;
  let last = +(quote.last * (1 + change)).toFixed(2);
  if (last < 5) {
    last = quote.last;
  }

  const result = {
    volume: quote.volume,
    open: quote.open,
    high: last > quote.high ? last : quote.high,
    low: last < quote.low ? last : quote.low,
    last: last,
    prev: quote.last,
    change: +(last - quote.open).toFixed(2)
  };
  return result;
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
  last.open = last.last;
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
  last.open = last.last;
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
      if (quote.hours[i][j] && quote.hours[i][j].last) {
        last = quote.hours[i][j];
      }
    }
  }
  return last;
}

