import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order } from '../interfaces/order.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  getAll(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }
}
