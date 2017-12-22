import * as Mongoose from 'mongoose';

import { Stock } from '../../shared';

interface StockModel extends Stock, Mongoose.Document {}

export let stockSchema = new Mongoose.Schema({
  name: String,
  initials: String,
  time: Number,
  volume: Number,
  high: Number,
  low: Number,
  open: Number,
  close: Number,
  last: Number,
  prev: Number,
  change: Number
});

export let DBStock = Mongoose.model<StockModel>('Stock', stockSchema);
