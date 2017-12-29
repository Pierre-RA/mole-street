import * as Mongoose from 'mongoose';

import { User, Portfolio } from '../../shared';

interface UserModel extends User, Mongoose.Document {}

export let userSchema = new Mongoose.Schema({
  name: String,
  password: String,
  email: String,
  balance: Number,
  portfolio: [{
    initials: String,
    amount: Number,
    price: Number,
    timestamp: String
  }],
});

export let DBUser = Mongoose.model<UserModel>('User', userSchema);
