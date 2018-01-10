import * as moment from 'moment';

import { QuarterlyQuote, DailyQuote } from '../../shared';
import { DBQuote } from '../db';
import { Random } from './random';
import { Text } from './text';
import { Generator } from './generator';

/**
 * class Evaluator
 */
export class Evaluator {

  /**
   * evalFirst(): void
   * Eval stocks when the server launch
   */
  static evalFirst(): void {
    let hasBasicIndices = false;
    // Get all latest stocks
    DBQuote.aggregate([{
      $sort: { symbol: 1, date: -1}
    }, {
      $group: {
        _id: '$symbol',
        name: {$first: '$name'},
        symbol: {$first: '$symbol'},
        date: {$first: '$date'},
        indicators: {$first: '$indicators'},
        amount: {$first: '$amount'},
        isIndex: {$first: '$isIndex'},
        hours: {$first: '$hours'}
      }
    }])
      .then(doc => {
        // Clone stocks older than today
        let clones: Array<DailyQuote>;
        clones = [];
        doc.forEach((quote: DailyQuote) => {
          // Stock is older, clone it
          if (moment(quote.date).isBefore(moment(), 'day')) {
            clones.push(cloneQuote(quote));
          }
          // Quote is an Index
          if (quote.isIndex) {
            hasBasicIndices = true;
          }
        });
        return DBQuote.insertMany(clones);
      })
      .then(doc => {
        console.log('*** info    *** ' + doc.length + ' quotes have been updated');
        if (!hasBasicIndices) {
          return DBQuote.insertMany(Generator.getBasicIndicators());
        }
      })
      .then(doc => {
        if (doc) {
          console.log('*** info    *** ' + doc.length + ' indices have been updated');
        }
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
    let tmp: QuarterlyQuote;
    DBQuote.find({ date: day }).sort({ isIndex: 1 })
      .then(doc => {
        const bulk = DBQuote.collection.initializeOrderedBulkOp();
        doc.forEach(quote => {
          if (!quote.isIndex) {
            tmp = evalQuarterly(getLastQuote(quote));
            bulk.find({ symbol: quote.symbol }).update({ $set: {
              [quarterly]: tmp
            }});
          } else {
            // TODO: adapt index
            bulk.find({ symbol: quote.symbol }).update({ $set: {
              [quarterly]: getLastQuote(quote)
            }});
          }
        });
        return bulk.execute();
      })
      .then(() => {
        // return DBStock.find({ date: day });
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
  if (last < 0.05) {
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
 * cloneQuote(quote: DailyQuote): DailyQuote
 * Clone quote with a new date set as today
 */
function cloneQuote(quote: DailyQuote): DailyQuote {
  let result: DailyQuote;
  const time = moment();
  const hour = time.get('hours').valueOf();
  const quarter = Math.floor(time.get('minutes').valueOf() / 15);
  result = {
    name: quote.name,
    symbol: quote.symbol,
    isIndex: quote.isIndex,
    date: moment().startOf('day').toString(),
    indicators: quote.indicators,
    amount: quote.amount,
    hours: Text.getEmptyHours()
  };
  const last = getLastQuote(quote);
  last.open = last.last;
  result.hours[8][0] = last;
  result.hours[hour][quarter] = last;
  return result;
}

/**
 * getLastQuote(quote: DailyQuote): QuarterlyQuote
 */
function getLastQuote(quote: DailyQuote): QuarterlyQuote {
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

