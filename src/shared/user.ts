import { Asset } from './asset';

export interface User {
  name: string;
  password: string;
  email: string;
  balance: number;
  portfolio: Array<Asset>;
}

