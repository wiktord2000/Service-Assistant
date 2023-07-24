import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-order-profile-link',
  templateUrl: './order-profile-link.component.html',
  styleUrls: ['./order-profile-link.component.scss']
})
export class OrderProfileLinkComponent implements OnInit {
  @Input() order!: Order;
  routerLink: string;
  iconName: string = 'summarize';

  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.routerLink = this.utils.getOrderRouterLink(this.order);
  }
}
