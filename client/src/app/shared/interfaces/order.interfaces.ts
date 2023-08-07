export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}

export interface Order {
  date?: string;
  order?: number;
  list: OrderPosition[];
  user?: string;
}
