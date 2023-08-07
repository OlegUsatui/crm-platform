import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialInstance, MaterializeService } from '../shared/classes/materialize.service';
import { Order } from '../shared/interfaces/order.interfaces';
import { OrdersService } from '../shared/services/orders.service';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef!: ElementRef;
  tooltip!: MaterialInstance;
  isFilterShow = false;
  orders: Order[] = [];
  loading = false;
  reloading = false;
  noMoreOrders = false;

  offset = STEP;
  limit = 2;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  ngAfterViewInit() {
    this.tooltip = MaterializeService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy() {
    this.tooltip.destroy();
  }

  loadMore() {
    this.offset = this.offset + STEP;
    this.loading = true;
    this.fetch();
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    }
    this.ordersService.getAll(params).subscribe(
      orders => {
        this.orders = this.orders.concat(orders);
        this.noMoreOrders = orders.length < STEP;
        this.loading = false;
        this.reloading = false;
      }
    )
  }
}
