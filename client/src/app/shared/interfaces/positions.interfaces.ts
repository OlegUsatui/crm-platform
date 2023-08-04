import { User } from './user';

export interface Position {
  name: string;
  cost: number;
  category?: string;
  user?: User;
  quantity?: number;
}
