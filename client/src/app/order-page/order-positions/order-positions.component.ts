import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { PositionsService } from '../../shared/services/positions.service';
import { Position } from '../../shared/interfaces/positions.interfaces';
import { OrderService } from '../../shared/services/order.service';
import { MaterializeService } from '../../shared/classes/materialize.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$!: Observable<Position[]>

  constructor(private route: ActivatedRoute,
              private positionService: PositionsService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap(({ id }) => {
        return this.positionService.getAll(id)
      }),
      map((positions) => {
        return positions.map(position => {
          position.quantity = 1
          return position
        })
      })
    )
  }

  addToOrder(position: Position): void {
    MaterializeService.toast(`Added x${position.quantity}`)
    this.orderService.add(position)
  }
}
