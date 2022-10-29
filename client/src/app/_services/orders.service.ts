import { Order } from './../_models/Order';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrders(statusPostions?: number[]){

    // If no array provided - simple request
    if(!statusPostions) return this.http.get<Order[]>(this.baseUrl + "orders");

    // Otherwise - append query params
    let params = statusPostions.reduce((params, statusPosition) => params.append('statusPositions', statusPosition), new HttpParams());
    return this.http.get<Order[]>(this.baseUrl + "orders", {params});
  }

  getOrder(id: number) {
    return this.http.get<Order>(this.baseUrl + 'orders/' + id);
  }

  updateOrder(order: Order){
    return this.http.put<Order>(`${environment.apiUrl}orders/${order.id}`, order);
  }
}
