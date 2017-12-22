import * as cron from 'node-cron';

import { Evaluator } from '../utils';

export class Crontab {

  static doEval(time: string): void {
    cron.schedule(time + ' * * * *', function() {
      Evaluator.evalDB();
    });
  }

  static executeAll() {
    this.doEval('*');
  }

}
