import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

import { Evaluator } from './src/api/utils';

// Enable dotenv configuration
dotenv.config();

// MongoDB connection
(<any>mongoose).Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});
mongoose.connection.on('error', () => {
  console.error('*** MongoDB *** connection error. Please make sur MongoDB is running.');
  process.exit();
});
mongoose.connection.on('open', () => {
  console.log('*** MongoDB *** connection is open.');
});

const args = process.argv;

if (args.length > 2) {
  console.log('*** info    *** Eval first');
  Evaluator.evalFirst()
    .then(bool => {
      process.exit(0);
    });
} else {
  console.log('*** info    *** Eval sixth');
  Evaluator.evalSixthly()
    .then(bool => {
      process.exit(0);
    });
}
