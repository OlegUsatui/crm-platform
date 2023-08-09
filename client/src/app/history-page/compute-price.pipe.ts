import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../shared/interfaces/order.interfaces';

@Pipe({
  name: 'computePrice'
})
export class ComputePricePipe implements PipeTransform {

  transform(value: Order): number {
    return value.list.reduce((total, item) => {
      total += item.cost * item.quantity
      return total
    }, 0)
  }

}
