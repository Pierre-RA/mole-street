import { Stock } from './stock';

export interface Indicator {
  name: string;
  short: string;
  time: number;
  last: number;
  change: number;
  high: number;
  low: number;
}
