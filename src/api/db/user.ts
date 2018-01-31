import * as Mongoose from 'mongoose';

import { User } from '../../shared';

interface UserModel extends User, Mongoose.Document {}

export let userSchema = new Mongoose.Schema({
  name: String,
  password: {
    type: String,
    select: false,
    required: true,
  },
  isAdmin: Boolean,
  email: {
    type: String,
    required: true,
    unique: true
  },
  balance: Number,
  portfolio: [{
    symbol: String,
    amount: Number,
    price: Number,
    timestamp: String
  }],
});

export let DBUser = Mongoose.model<UserModel>('User', userSchema);
