import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import { Product } from 'src/app/core/models/product';
import { OrdersService } from 'src/app/features/orders/data-access/orders.service';
import { OrdersTableComponent } from 'src/app/features/orders/ui/orders-table/orders-table.component';
import { ProductProfileComponent } from '../product-profile/product-profile.component';

@Component({
  selector: 'app-product-profile-orders',
  templateUrl: './product-profile-orders.component.html',
  styleUrls: ['./product-profile-orders.component.scss']
})
export class ProductProfileOrdersComponent implements OnInit {
  @ViewChild(OrdersTableComponent) ordersTable: OrdersTableComponent;
  product: Product;
  orders: Order[];
  displayFinished: boolean = false;
  constructor(
    @SkipSelf() private productProfile: ProductProfileComponent,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.product = this.productProfile.product;
    this.loadProductOrders();
  }

  filterFinshedOrders(orders: Order[]) {
    return orders.filter((order) => order.status.position !== 4);
  }

  onToggleChange() {
    this.displayFinished = !this.displayFinished;
    this.displayFinished
      ? this.ordersTable.dataSource.setOrders(this.orders)
      : this.ordersTable.dataSource.setOrders(this.filterFinshedOrders(this.orders));
  }

  loadProductOrders() {
    this.ordersService.getOrdersWithProduct(this.product.id).subscribe((orders) => {
      this.orders = orders;
    });
  }
}
