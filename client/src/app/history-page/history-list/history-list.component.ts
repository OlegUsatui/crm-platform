import { Component, Input } from '@angular/core';
import { Order } from '../../shared/interfaces/order.interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent {
  @Input() orders!: Order[];
}
