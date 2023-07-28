import { User } from './user';

export interface Category {
  name: string;
  imgSrc: string;
  user?: User;
  _id?: string;
}
