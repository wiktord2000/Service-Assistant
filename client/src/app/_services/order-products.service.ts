import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderProduct } from '../_models/OrderProduct';

@Injectable({
  providedIn: 'root'
})
export class OrderProductsService {
  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrderProducts(orderId?: number) {
    if (!orderId) this.http.get<OrderProduct[]>(this.baseUrl + 'orderProducts/');

    let params = new HttpParams().appendAll({
      orderId: orderId
    });

    return this.http.get<OrderProduct[]>(this.baseUrl + 'orderProducts/', { params });
  }

  getOrderProduct(id: number) {
    return this.http.get<OrderProduct>(this.baseUrl + 'orderProducts/' + id);
  }

  addOrderProduct(orderProduct: OrderProduct) {
    return this.http.post<OrderProduct>(this.baseUrl + 'orderProducts/', orderProduct);
  }

  updateOrderProduct(id: number, orderProduct: OrderProduct) {
    return this.http.put<OrderProduct>(this.baseUrl + 'orderProducts/' + id, orderProduct);
  }

  deleteOrderProduct(id: number) {
    return this.http.delete(this.baseUrl + 'orderProducts/' + id);
  }
}
