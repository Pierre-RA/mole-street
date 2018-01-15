import { Asset } from './asset';

export interface User {
  name: string;
  password: string;
  isAdmin: boolean;
  email: string;
  balance: number;
  portfolio: Array<Asset>;
}

