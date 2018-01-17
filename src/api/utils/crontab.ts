import * as cron from 'node-cron';

import { Evaluator } from '../utils';

/**
 * class Crontab
 */
export class Crontab {

  /**
   * evalFirst()
   * Eval stocks when starting the server
   */
  static evalFirst(): void {
    console.log('*** info    *** Eval first');
    Evaluator.evalFirst();
  }

  /**
   * executeAll()
   * Launch all cron
   */
  static executeAll() {
    this.evalFirst();
  }

}
