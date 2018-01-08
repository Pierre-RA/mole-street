import * as Mongoose from 'mongoose';

import { DailyQuote } from '../../shared';

interface StockModel extends DailyQuote, Mongoose.Document {}

export let stockSchema = new Mongoose.Schema({
  name: String,
  symbol: String,
  date: { type: Date, default: Date.now },
  indicators: [String],
  amount: Number,
  hours: {
    8: {
      0: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      1: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      2: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      3: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      }
    },
    9: {
      0: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      1: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      2: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      3: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      }
    },
    10: {
      0: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      1: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      2: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      3: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      }
    },
    11: {
      0: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      1: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      2: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      3: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      }
    },
    12: {
      0: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      1: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      2: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      3: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      }
    },
    13: {
      0: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      1: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      2: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      3: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      }
    },
    14: {
      0: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      1: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      2: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      3: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      }
    },
    15: {
      0: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      1: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      2: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      3: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      }
    },
    16: {
      0: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      1: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      2: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      },
      3: {
        volume: Number,
        open: Number,
        high: Number,
        low: Number,
        last: Number,
        prev: Number,
        change: Number
      }
    }
  }
});

export let DBStock = Mongoose.model<StockModel>('stock', stockSchema);
