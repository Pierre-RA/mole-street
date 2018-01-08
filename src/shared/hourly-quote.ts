import { QuarterlyQuote } from './quarterly-quote';

export interface HourlyQuote {
  quarters: {
    0: QuarterlyQuote,
    1: QuarterlyQuote,
    2: QuarterlyQuote,
    3: QuarterlyQuote,
  };
}
