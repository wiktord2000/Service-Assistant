import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/models/Product';

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.scss']
})
export class ProductProfileComponent implements OnInit, OnDestroy {
  product: Product;
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Data from resolver
    this.subscription = this.activatedRoute.data.subscribe((data: Data) => {
      this.product = data['product'];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
