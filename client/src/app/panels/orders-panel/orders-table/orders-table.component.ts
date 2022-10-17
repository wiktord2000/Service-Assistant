import { NativeDateAdapter } from '@angular/material/core';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Order } from 'src/app/_models/Order';
import { OrdersService } from 'src/app/_services/orders.service';
import { OrdersTableDataSource } from './orders-table-datasource';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;    // ! - assured that paginator exists
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Order>;

  dataSource: OrdersTableDataSource;
  displayedColumns= ["orderNumber", "createDate", "finishDate", "status", "client", "vehicle", "admissionDate", "deadlineDate", "totalGross", "actions"];

  
  constructor(public ordersService: OrdersService) {}
  
  ngOnInit(): void {
    this.dataSource = new OrdersTableDataSource(this.ordersService);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
