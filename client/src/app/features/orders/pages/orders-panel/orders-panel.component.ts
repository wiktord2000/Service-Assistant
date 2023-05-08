import { AfterViewInit } from '@angular/core';
// import orders from '../../_seed-data/oders.json' and in the class we have to add prop ->  orders: Order[] = orders;      // Seed data from json file
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/features/orders/data-access/orders.service';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { FormControl } from '@angular/forms';
import { OrdersTableComponent } from 'src/app/features/orders/ui/orders-table/orders-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrderDialogComponent } from 'src/app/features/orders/ui/create-order-dialog/create-order-dialog.component';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-orders-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.scss']
})
export class OrdersPanelComponent implements OnInit, AfterViewInit {
  @ViewChild(OrdersTableComponent) ordersTable!: OrdersTableComponent;
  statusControl = new FormControl(['0', '1', '2', '3']);

  constructor(
    public snackbarService: SnackbarService,
    public ordersService: OrdersService,
    public dialog: MatDialog
  ) {}
  ngAfterViewInit(): void {
    this.ordersTable.dataSource.loadOrders(this.statusControl.value.map(Number));
  }

  ngOnInit(): void {}

  onToggleGroupChange() {
    !this.statusControl.value.length
      ? this.ordersTable.dataSource.setOrders([])
      : this.ordersTable.dataSource.loadOrders(this.statusControl.value.map(Number));
  }

  onAddOrder() {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe((order: Order) => {
      if (order !== undefined) this.ordersTable.dataSource.addOrder(order);
    });
  }
}
