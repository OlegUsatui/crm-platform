import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialInstance, MaterializeService } from '../shared/classes/materialize.service';
import { OrderService } from './order.service';
import { Order, OrderPosition } from '../shared/interfaces/order.interfaces';
import { OrdersService } from '../shared/services/orders.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef!: ElementRef;
  modal!: MaterialInstance;
  isRoot?: boolean;
  pending = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router,
              public order: OrderService,
              private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  open(): void {
    this.modal.open();
  }

  cancel(): void {
    this.modal.close();
  }

  submit(): void {
    this.pending = true;

    const order: Order = {
      list: this.order.list.map(o => {
        delete o._id;
        return o;
      })
    }

    this.ordersService.create(order).pipe(takeUntil(this.destroy$)).subscribe(
      newOrder => {
        MaterializeService.toast(`Order #${newOrder.order} created`);
        this.order.clear();
      },
      error => MaterializeService.toast(error.error.message),
      () => {
        this.pending = false;
        this.modal.close();
      }
    )
  }

  removePosition(item: OrderPosition) {
    this.order.remove(item);
  }
}
