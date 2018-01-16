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
        open: {$first: '$open'},
        high: {$first: '$high'},
        low: {$first: '$low'},
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
    let next: QuarterlyQuote;
    const indices = {};
    DBQuote.find({ date: day, isIndex: false })
      .then(doc => {
        const bulk = DBQuote.collection.initializeOrderedBulkOp();
        doc.forEach(quote => {
          next = evalQuarterly(getLastQuote(quote));
          bulk.find({ date: day.toDate(), symbol: quote.symbol }).update({ $set: {
            [quarterly]: next,
            high: next.last > quote.high ? next.last : quote.high,
            low: next.last < quote.low ? next.last : quote.low
          }});
          quote.indicators.forEach(index => {
            if (!indices[index]) {
              indices[index] = 0;
            }
            indices[index] += (next.last * quote.amount);
          });
        });
        return bulk.execute();
      })
      .then(() => {
        return DBQuote.find({ date: day, isIndex: true });
      })
      .then(doc => {
        const bulk = DBQuote.collection.initializeOrderedBulkOp();
        doc.forEach(quote => {
          next = evalIndex(indices[quote.symbol], getLastQuote(quote));
          bulk.find({ date: day.toDate(), symbol: quote.symbol }).update({ $set: {
            [quarterly]: next,
            high: next.last > quote.high ? next.last : quote.high,
            low: next.last < quote.low ? next.last : quote.low
          }});
        });
        return bulk.execute();
      })
      .then(() => {
        // Done
      })
      .catch(err => {
        console.error(err);
      });
  }
}

/**
 * evalIndex(value: number, quote: QuarterlyQuote): QuarterlyQuote
 */
function evalIndex(value: number, quote: QuarterlyQuote): QuarterlyQuote {
  let last;
  if (quote.volume > 0) {
    last = +((value / quote.volume) * quote.last).toFixed(2);
  } else {
    last = 100;
    quote.volume = value || 0;
  }

  const result = {
    volume: quote.volume,
    last: last,
    prev: quote.last,
    trend: quote.trend
  };
  return result;
}

/**
 * evalQuarterly(quote: QuarterlyQuote): QuarterlyQuote
 */
function evalQuarterly(quote: QuarterlyQuote): QuarterlyQuote {
  let range = 0.02;
  let axis = 0.01;
  let luck = 0.5;

  // Positive outcome
  if (quote.prev !== 0 && quote.last < quote.prev) {
    luck = 0.495;
  }

  // Negative outcome
  if (quote.prev !== 0 && quote.last > quote.prev) {
    luck = 0.505;
  }

  // Trend intervention
  luck += quote.trend;

  // Luck intervention
  const rand = Math.random();
  if (rand > luck) {
    axis = 0.005;
  } else {
    axis = 0.015;
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
    last: last,
    prev: quote.last,
    trend: quote.trend
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
  const last = getLastQuote(quote);
  result = {
    name: quote.name,
    symbol: quote.symbol,
    isIndex: quote.isIndex,
    date: moment().startOf('day').toString(),
    indicators: quote.indicators,
    amount: quote.amount,
    hours: Text.getEmptyHours(),
    open: last.last,
    high: last.last,
    low: last.last
  };
  // last.open = last.last;
  // last.change = 0;
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

