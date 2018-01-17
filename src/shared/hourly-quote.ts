import { SixthlyQuote } from './sixthly-quote';

export interface HourlyQuote {
  quarters: {
    0: SixthlyQuote,
    1: SixthlyQuote,
    2: SixthlyQuote,
    3: SixthlyQuote,
    4: SixthlyQuote,
    5: SixthlyQuote
  };
}
