import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderService } from '../../../core/models/OrderService';

@Injectable({
  providedIn: 'root'
})
export class OrderServicesService {
  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrderServices(orderId?: number) {
    if (!orderId) this.http.get<OrderService[]>(this.baseUrl + 'orderServices/');

    let params = new HttpParams().appendAll({
      orderId: orderId
    });

    return this.http.get<OrderService[]>(this.baseUrl + 'orderServices/', { params });
  }

  getOrderService(id: number) {
    return this.http.get<OrderService>(this.baseUrl + 'orderServices/' + id);
  }

  addOrderService(orderService: OrderService) {
    return this.http.post<OrderService>(this.baseUrl + 'orderServices/', orderService);
  }

  updateOrderService(id: number, orderService: OrderService) {
    return this.http.put<OrderService>(this.baseUrl + 'orderServices/' + id, orderService);
  }

  deleteOrderService(id: number) {
    return this.http.delete(this.baseUrl + 'orderServices/' + id);
  }
}
