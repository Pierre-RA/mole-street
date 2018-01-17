import * as Mongoose from 'mongoose';

import { DailyQuote } from '../../shared';

interface QuoteModel extends DailyQuote, Mongoose.Document {}

export let quoteSchema = new Mongoose.Schema({
  name: String,
  symbol: String,
  date: { type: Date, default: Date.now },
  isIndex: Boolean,
  indicators: [String],
  amount: Number,
  open: Number,
  high: Number,
  low: Number,
  hours: {
    8: {
      0: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      1: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      2: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      3: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      4: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      5: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      }
    },
    9: {
      0: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      1: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      2: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      3: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      4: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      5: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      }
    },
    10: {
      0: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      1: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      2: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      3: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      4: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      5: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      }
    },
    11: {
      0: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      1: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      2: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      3: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      4: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      5: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      }
    },
    12: {
      0: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      1: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      2: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      3: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      4: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      5: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      }
    },
    13: {
      0: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      1: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      2: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      3: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      4: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      5: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      }
    },
    14: {
      0: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      1: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      2: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      3: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      4: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      5: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      }
    },
    15: {
      0: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      1: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      2: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      3: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      4: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      5: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      }
    },
    16: {
      0: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      1: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      2: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      3: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      4: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      },
      5: {
        volume: Number,
        last: Number,
        prev: Number,
        trend: Number
      }
    }
  }
});

export let DBQuote = Mongoose.model<QuoteModel>('quote', quoteSchema);
