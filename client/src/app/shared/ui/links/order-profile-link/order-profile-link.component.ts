import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, distinctUntilChanged, map } from 'rxjs';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-order-profile-link',
  templateUrl: './order-profile-link.component.html',
  styleUrls: ['./order-profile-link.component.scss']
})
export class OrderProfileLinkComponent implements OnInit {
  @Input() order: Order;
  subscription: Subscription;
  isXSmall$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map((value) => value.matches),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
