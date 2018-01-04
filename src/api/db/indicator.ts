import * as Mongoose from 'mongoose';

import { Indicator } from '../../shared';

interface IndicatorModel extends Indicator, Mongoose.Document {}

export let indicatorSchema = new Mongoose.Schema({
  name: String,
  short: String,
  time: Number,
  last: Number,
  change: Number,
  high: Number,
  low: Number
});

export let DBIndicator = Mongoose.model<IndicatorModel>('Indicator', indicatorSchema);
