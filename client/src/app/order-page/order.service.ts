import { Injectable } from '@angular/core';
import { Position } from '../shared/interfaces/positions.interfaces';
import { OrderPosition } from '../shared/interfaces/order.interfaces';

@Injectable()
export class OrderService {
  list: OrderPosition[] = [];
  totalPrice = 0;

  add(position: Position): void {
    const orderPosition: OrderPosition = {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity || 1,
      _id: position._id
    }

    const candidate = this.list.find(p => p._id === orderPosition._id);

    if (candidate) {
      candidate.quantity += orderPosition.quantity
    } else {
      this.list.push(orderPosition)
    }

    this.computePrice()
  }

  remove(orderPosition: OrderPosition): void {
    const idx = this.list.findIndex(p => p._id === orderPosition._id);

    this.list.splice(idx, 1);

    this.computePrice();
  }

  clear(): void {
    this.list = [];
    this.totalPrice = 0;
  }

  private computePrice() {
    this.totalPrice = this.list.reduce((total, item) => {
      total += item.quantity * item.cost
      return total
    }, 0)
  }
}
