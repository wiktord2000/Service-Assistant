import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/core/models/Order';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { CreateOrderDialogComponent } from 'src/app/features/orders/ui/create-order-dialog/create-order-dialog.component';
import { OrdersTableComponent } from 'src/app/features/orders/ui/orders-table/orders-table.component';
import { VehicleProfileComponent } from '../vehicle-profile/vehicle-profile.component';

@Component({
  selector: 'app-vehicle-profile-orders',
  templateUrl: './vehicle-profile-orders.component.html',
  styleUrls: ['./vehicle-profile-orders.component.scss']
})
export class VehicleProfileOrdersComponent implements OnInit {
  @ViewChild(OrdersTableComponent) ordersTable: OrdersTableComponent;
  vehicle: Vehicle;
  displayFinished: boolean = false;
  constructor(
    @SkipSelf() private vehiclesProfile: VehicleProfileComponent,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.vehicle = this.vehiclesProfile.vehicle;
  }

  onToggleChange() {
    this.displayFinished = !this.displayFinished;
    this.displayFinished
      ? this.ordersTable.dataSource.setOrders(this.vehicle.orders)
      : this.ordersTable.dataSource.setOrders(this.filterFinshedOrders(this.vehicle.orders));
  }

  filterFinshedOrders(orders: Order[]) {
    return orders.filter((order) => order.status.position !== 4);
  }

  onAddOrder() {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      width: '800px',
      data: { vehicle: this.vehicle }
    });
    dialogRef.afterClosed().subscribe((order: Order) => {
      if (order !== undefined) this.ordersTable.dataSource.addOrder(order);
    });
  }
}
