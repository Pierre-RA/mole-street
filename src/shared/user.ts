import { Portfolio } from './portfolio';

export interface User {
  name: string;
  password: string;
  email: string;
  balance: number;
  portfolio: Array<Portfolio>;
}

