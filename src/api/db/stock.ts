import * as Mongoose from 'mongoose';

import { Stock } from '../../shared';

interface StockModel extends Stock, Mongoose.Document {
  findLast(): Array<Stock>;
}

export let stockSchema = new Mongoose.Schema({
  name: String,
  initials: { type: String, index: true },
  time: { type: Number, index: true },
  volume: Number,
  high: Number,
  low: Number,
  open: Number,
  close: Number,
  last: Number,
  prev: Number,
  change: Number
});

stockSchema.statics.findLast = function() {
  return this.model('Stock').aggregate([{
    $sort: { initials: 1, time: -1}
  }, {
    $group: {
      _id: '$initials',
      name: {$first: '$name'},
      initials: {$first: '$initials'},
      time: {$first: '$time'},
      volume: {$first: '$volume'},
      high: {$first: '$high'},
      low: {$first: '$low'},
      open: {$first: '$open'},
      close: {$first: '$close'},
      last: {$first: '$last'},
      prev: {$first: '$prev'},
      change: {$first: '$change'},
    }
  }]);
};

export let DBStock = Mongoose.model<StockModel>('Stock', stockSchema);
