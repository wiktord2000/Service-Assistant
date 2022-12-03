import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + 'products/');
  }

  getProductsSearch(productsNumber: number, match: string) {
    let params = new HttpParams().appendAll({
      productsNumber: productsNumber,
      match: match
    });

    return this.http.get<Product[]>(this.baseUrl + 'products/search', { params });
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.baseUrl + 'products/', product);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product>(this.baseUrl + 'products/' + id, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }
}
