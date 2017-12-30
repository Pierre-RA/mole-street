import { ChartData } from './chart-data';

export interface Chart {
  name: string;
  series: Array<ChartData>;
}
