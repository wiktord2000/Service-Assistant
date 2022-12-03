import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { OrderService } from 'src/app/_models/OrderService';
import { OrderServicesService } from 'src/app/_services/order-services.service';
import { OrderServicesTableDataSource } from './order-services-table-datasource';

@Component({
  selector: 'app-order-services-table',
  templateUrl: './order-services-table.component.html',
  styleUrls: ['./order-services-table.component.css']
})
export class OrderServicesTableComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<OrderService>;
  @Input() initialData?: OrderService[];
  @Input() matElevationValue?: number = 8;
  @Input() fixedSize?: boolean = true;

  dataSource: OrderServicesTableDataSource;
  displayedColumns = [
    'approvedServiceName',
    'approvedEstimatedTime',
    'approvedTotalCostGross',
    'actions'
  ];

  constructor(public orderServicesService: OrderServicesService) {}

  ngOnInit(): void {
    // Create DataSource (with initialData if needed)
    this.dataSource = new OrderServicesTableDataSource(this.orderServicesService, this.initialData);
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
  }

  onDeleteClick(orderService: OrderService) {
    this.dataSource.deleteOrderService(orderService.id);
  }
}
