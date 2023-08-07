import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialInstance, MaterializeService } from '../shared/classes/materialize.service';
import { OrderService } from '../shared/services/order.service';
import { OrderPosition } from '../shared/interfaces/order.interfaces';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef!: ElementRef;
  modal!: MaterialInstance;
  isRoot?: boolean;

  constructor(private router: Router, public order: OrderService) {
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
  }

  open(): void {
    this.modal.open();
  }

  cancel(): void {
    this.modal.close();
  }

  submit(): void {
    this.modal.close();
  }

  removePosition(item: OrderPosition) {
    this.order.remove(item)
  }
}
