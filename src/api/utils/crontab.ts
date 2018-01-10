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
    console.log('*** cron    *** Eval first');
    Evaluator.evalFirst();
  }

  /**
   * evalNewDay()
   * Eval each new day
   */
  static evalNewDay(): void {
    cron.schedule('0 8 * * *', function() {
      console.log('*** cron    *** Eval new day');
      Evaluator.evalFirst();
    });
  }

  /**
   * evalQuarterly()
   * Eval during the day
   */
  static evalQuarterly(): void {
    cron.schedule('0 9-16 * * *', function() {
      console.log('*** cron    *** Eval new hour');
      Evaluator.evalQuarterly();
    });
    cron.schedule('15,30,45 8-16 * * *', function() {
      console.log('*** cron    *** Eval quarterly');
      Evaluator.evalQuarterly();
    });
  }

  /**
   * executeAll()
   * Launch all cron
   */
  static executeAll() {
    this.evalFirst();
    this.evalNewDay();
    this.evalQuarterly();
  }

}
