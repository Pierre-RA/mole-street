import * as moment from 'moment';

import { QuarterlyQuote, DailyQuote } from '../../shared';
import { Random } from './random';
import { Text } from './text';

export class Generator {

  constructor() {}

  static getStock(list?: Array<string>): DailyQuote {
    const adj: string = Random.getAdjective();
    const type: string = Random.getType();
    const name: string = Random.getName(type);
    const suffix: string = Random.getSuffix();
    const price: number = Random.getDecimal(5, 195);
    let day = moment().startOf('day');
    if (new Date().getHours() > 16) {
      day = moment(day).add(1, 'days');
    }
    list = list || [];
    const quote = {
      name: adj + ' ' + name + suffix,
      date: day.toString(),
      isIndex: false,
      symbol: Text.getUniqueInitials(adj + ' ' + name, list),
      indicators: ['MS-ALL', type],
      amount: Random.getInt(1000, 59999) * 1000,
      hours: Text.getEmptyHours(),
      open: price,
      high: price,
      low: price
    };
    return Text.insertAtQuote(quote, {
      volume: quote.amount,
      last: price,
      prev: price,
      trend: 0
    }, new Date());
  }

  static getStockList(size: number, initials?: Array<string>): Array<DailyQuote> {
    const list: Array<DailyQuote> = [];
    initials = initials || [];
    let tmp: DailyQuote;
    for (let i = 0; i < size; i++) {
      tmp = this.getStock(initials);
      list.push(tmp);
      initials.push(tmp.symbol);
    }
    return list;
  }

  static getIndicator(name: string, symbol: string): DailyQuote {
    let day = moment().startOf('day');
    if (new Date().getHours() > 16) {
      day = moment(day).add(1, 'days');
    }
    const indicator = {
      name: name,
      symbol: symbol,
      date: day.toString(),
      isIndex: true,
      indicators: [],
      amount: 0,
      hours: Text.getEmptyHours(),
      open: 100,
      high: 100,
      low: 100
    };
    return Text.insertAtQuote(indicator, {
      volume: 0,
      last: 100,
      prev: 100,
      trend: 0
    }, new Date());
  }

  static getBasicIndicators(): Array<DailyQuote> {
    let result: Array<DailyQuote>;
    result = [];
    result.push(this.getIndicator('Mole Street All Stocks Index', 'MS-ALL'));
    result.push(this.getIndicator('MS All Consumer Discretionary Index', 'MS-ALL-CD'));
    result.push(this.getIndicator('MS All Consumer Staples Index', 'MS-ALL-CS'));
    result.push(this.getIndicator('MS All Energy Index', 'MS-ALL-E'));
    result.push(this.getIndicator('MS All Financial Index', 'MS-ALL-F'));
    result.push(this.getIndicator('MS All Health Care Index', 'MS-ALL-HC'));
    result.push(this.getIndicator('MS All Industrials Index', 'MS-ALL-I'));
    result.push(this.getIndicator('MS All Information Technology Index', 'MS-ALL-IT'));
    result.push(this.getIndicator('MS All Materials Index', 'MS-ALL-M'));
    result.push(this.getIndicator('MS All Real Estate Index', 'MS-ALL-RE'));
    result.push(this.getIndicator('MS All Telecom Services Index', 'MS-ALL-TS'));
    result.push(this.getIndicator('MS All Utilities Index', 'MS-ALL-U'));
    return result;
  }
}
