import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Order } from 'src/app/_models/Order';
import { Status } from 'src/app/_models/Status';
import { Vehicle } from 'src/app/_models/Vehicle';
import { OrdersService } from 'src/app/_services/orders.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { VehiclesTableDataSource } from './vehicles-table-datasource';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css']
})
export class VehiclesTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;    // ! - assured that paginator exists
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vehicle>;
  @Input() initialData?: Vehicle[];
  @Input() hideCurrentOwnerColumn?: boolean = false;
  @Input() matElevationValue?: number = 8;
  @Input() fixedSize?: boolean = true;

  dataSource: VehiclesTableDataSource;
  displayedColumns= ["vehicleName", "registrationNumber", "vin", "currentOwner", "productionDate", "capacity", "engineFuel", "enginePower", "actions"];
                      

  
  constructor(public vehiclesService: VehiclesService,
              private snackbarService: SnackbarService) {}
  
  ngOnInit(): void {
    this.dataSource = new VehiclesTableDataSource(this.vehiclesService);
    // Hide client column
    this.displayedColumns = this.displayedColumns.filter((column) => !(column === 'currentOwner' && this.hideCurrentOwnerColumn));
    this.initialData && this.dataSource.setVehicles(this.initialData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
