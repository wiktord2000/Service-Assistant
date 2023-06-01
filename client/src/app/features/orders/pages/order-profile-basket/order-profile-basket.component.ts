import { AfterViewInit, Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CREATE_ORDER_DIALOG_DEFAULT_CONFIG,
  CreateOrderDialogComponent
} from '../../ui/create-order-dialog/create-order-dialog.component';
import { OrderServicesTableComponent } from '../../ui/order-services-table/order-services-table.component';
import { OrderProductsTableComponent } from '../../ui/order-products-table/order-products-table.component';
import { OrderProfileComponent } from '../order-profile/order-profile.component';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-order-profile-basket',
  templateUrl: './order-profile-basket.component.html',
  styleUrls: ['./order-profile-basket.component.scss']
})
export class OrderProfileBasketComponent implements OnInit, AfterViewInit {
  @ViewChild(OrderServicesTableComponent)
  servicesTable: OrderServicesTableComponent;
  @ViewChild(OrderProductsTableComponent)
  productsTable: OrderProductsTableComponent;
  order: Order;
  constructor(@SkipSelf() private orderProfile: OrderProfileComponent, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.order = this.orderProfile.order;
  }

  ngAfterViewInit(): void {
    this.servicesTable.dataSource.loadOrderServices(this.order.id);
    this.productsTable.dataSource.loadOrderProducts(this.order.id);
  }

  onEditClick() {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      ...CREATE_ORDER_DIALOG_DEFAULT_CONFIG,
      data: { order: this.order }
    });
    dialogRef.afterClosed().subscribe((order: Order) => {
      if (!order) return;
      this.order = order;
      this.servicesTable.dataSource.setOrderServices(order.orderServices);
      this.productsTable.dataSource.setOrderProducts(order.orderProducts);
    });
  }

  getTotalGross() {
    let totalJobsGross = this?.servicesTable?.dataSource.getTotalCostGross() ?? 0.0;
    let totalPartsGross = this?.productsTable?.dataSource.getTotalSalesPriceGross() ?? 0.0;
    return totalJobsGross + totalPartsGross;
  }
}
