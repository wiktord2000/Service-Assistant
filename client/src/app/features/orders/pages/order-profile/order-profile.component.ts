import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/models/Order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-profile',
  templateUrl: './order-profile.component.html',
  styleUrls: ['./order-profile.component.scss']
})
export class OrderProfileComponent implements OnInit, OnDestroy {
  order: Order;
  subscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe((data) => {
      this.order = data['order'];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
