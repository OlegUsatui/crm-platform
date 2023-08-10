import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialInstance, MaterializeService } from '../shared/classes/materialize.service';
import { Order } from '../shared/interfaces/order.interfaces';
import { OrdersService } from '../shared/services/orders.service';
import { Subject, takeUntil } from 'rxjs';
import { Filter } from '../shared/interfaces/filter';

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
  filter: Filter = {};

  offset = STEP;
  limit = 2;

  destroy$ = new Subject<void>();

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
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMore() {
    this.offset = this.offset + STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: Filter): void {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

  private fetch() {
    const params = {
      ...this.filter,
      offset: this.offset,
      limit: this.limit
    };

    this.ordersService.getAll(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        orders => {
          this.orders = this.orders.concat(orders);
          this.noMoreOrders = orders.length < STEP;
          this.loading = false;
          this.reloading = false;
        }
      )
  }
}
