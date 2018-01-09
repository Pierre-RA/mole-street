import { HourlyQuote } from './hourly-quote';

export interface Quote {
  name: string;
  symbol: string;
  date?: string;
  hours: {
    8: HourlyQuote,
    9: HourlyQuote,
    10: HourlyQuote,
    11: HourlyQuote,
    12: HourlyQuote,
    13: HourlyQuote,
    14: HourlyQuote,
    15: HourlyQuote,
    16: HourlyQuote,
  };
}