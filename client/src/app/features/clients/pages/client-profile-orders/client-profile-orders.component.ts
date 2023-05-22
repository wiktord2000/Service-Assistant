import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/core/models/Client';
import { CreateOrderDialogComponent } from 'src/app/features/orders/ui/create-order-dialog/create-order-dialog.component';
import { ClientProfileComponent } from '../client-profile/client-profile.component';
import { Order } from 'src/app/core/models/Order';
import { OrdersTableComponent } from 'src/app/features/orders/ui/orders-table/orders-table.component';

@Component({
  selector: 'app-client-profile-orders',
  templateUrl: './client-profile-orders.component.html',
  styleUrls: ['./client-profile-orders.component.scss']
})
export class ClientProfileOrdersComponent implements OnInit {
  @ViewChild(OrdersTableComponent) ordersTable!: OrdersTableComponent;
  displayFinished: boolean = false;
  client: Client;

  constructor(
    @SkipSelf() private clientProfile: ClientProfileComponent,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.client = this.clientProfile.client;
  }

  onToggleChange() {
    this.displayFinished = !this.displayFinished;
    this.displayFinished
      ? this.ordersTable.dataSource.setOrders(this.client.orders)
      : this.ordersTable.dataSource.setOrders(this.filterFinshedOrders(this.client.orders));
  }

  filterFinshedOrders(orders: Order[]) {
    return orders.filter((order) => order.status.position !== 4);
  }

  onAddOrder() {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      width: '800px',
      data: { client: this.client }
    });
    dialogRef.afterClosed().subscribe((order: Order) => {
      if (order !== undefined) this.ordersTable.dataSource.addOrder(order);
    });
  }
}
