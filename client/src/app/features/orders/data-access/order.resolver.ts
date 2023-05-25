import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrdersService } from './orders.service';
import { Order } from 'src/app/core/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<Order> {
  constructor(private ordersService: OrdersService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order> {
    const orderId = Number(route.paramMap.get('id'));
    return this.ordersService.getOrder(orderId);
  }
}
