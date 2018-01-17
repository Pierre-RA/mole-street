import * as moment from 'moment';

import { SixthlyQuote, DailyQuote } from '../../shared';
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
  static evalFirst(): Promise<boolean> {
    let hasBasicIndices = false;
    // Get all latest stocks
    return DBQuote.aggregate([{
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
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * evalSixthly(): void
   * Eval during the day
   */
  static evalSixthly(): Promise<boolean> {
    const time = moment();
    if (time.get('hours').valueOf() < 8 || time.get('hours').valueOf() > 16) {
      return Promise.resolve(false);
    }
    const hour = time.get('hours').valueOf();
    const sixth = Math.floor(time.get('minutes').valueOf() / 10);
    const day = time.startOf('day');
    const sixthly = 'hours.' + hour + '.' + sixth;
    const lastQuarter = sixth - 1 < 0 ? 5 : sixth - 1;
    const lastHour = sixth === 5 ? hour - 1 : hour;
    let next: SixthlyQuote;
    const indices = {};
    return DBQuote.find({ date: day, isIndex: false })
      .then(doc => {
        const bulk = DBQuote.collection.initializeOrderedBulkOp();
        doc.forEach(quote => {
          next = evalSixthly(getLastQuote(quote));
          bulk.find({ date: day.toDate(), symbol: quote.symbol }).update({ $set: {
            [sixthly]: next,
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
            [sixthly]: next,
            high: next.last > quote.high ? next.last : quote.high,
            low: next.last < quote.low ? next.last : quote.low
          }});
        });
        return bulk.execute();
      })
      .then(() => {
        // Done
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }
}

/**
 * evalIndex(value: number, quote: SixthlyQuote): SixthlyQuote
 */
function evalIndex(value: number, quote: SixthlyQuote): SixthlyQuote {
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
 * evalQuarterly(quote: SixthlyQuote): SixthlyQuote
 */
function evalSixthly(quote: SixthlyQuote): SixthlyQuote {
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
  const sixth = Math.floor(time.get('minutes').valueOf() / 10);
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
  result.hours[8][0] = last;
  result.hours[hour][sixth] = last;
  return result;
}

/**
 * getLastQuote(quote: DailyQuote): SixthlyQuote
 */
function getLastQuote(quote: DailyQuote): SixthlyQuote {
  let last: SixthlyQuote;
  for (let i = 8; i < 17; i++) {
    for (let j = 0; j < 6; j++) {
      if (quote.hours[i][j] && quote.hours[i][j].last) {
        last = quote.hours[i][j];
      }
    }
  }
  return last;
}

