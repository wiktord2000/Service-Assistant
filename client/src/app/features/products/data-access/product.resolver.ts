import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
  constructor(private productsService: ProductsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const productId = Number(route.paramMap.get('id'));
    return this.productsService.getProduct(productId);
  }
}
