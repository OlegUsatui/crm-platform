import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Order } from '../../shared/interfaces/order.interfaces';
import { MaterialInstance, MaterializeService } from '../../shared/classes/materialize.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  @Input() orders!: Order[];
  @ViewChild('modal') modalRef!: ElementRef;
  modal!: MaterialInstance;
  selectedOrder!: Order;

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
    this.modal.open();
  }

  close(): void {
    this.modal.close()
  }
}
