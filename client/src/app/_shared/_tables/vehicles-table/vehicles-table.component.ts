import { Vehicle } from './../../../_models/Vehicle';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { VehiclesTableDataSource } from './vehicles-table-datasource';
import { ConfirmDialogComponent } from '../../_dialogs/confirm-dialog/confirm-dialog.component';

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
              public dialog: MatDialog,
              private snackbarService: SnackbarService) {}
  
  ngOnInit(): void {
    // Create DataSource (with initialData if needed)
    this.dataSource = new VehiclesTableDataSource(this.vehiclesService, this.initialData);
    // Hide client column (if needed)
    this.displayedColumns = this.displayedColumns.filter((column) => !(column === 'currentOwner' && this.hideCurrentOwnerColumn));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDeleteClick(vehicle: Vehicle){
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
              headerText: "Usuwanie pojazdu",
              bodyText: `<h3>Czy na pewno chcesz usunąć pojazd <strong>${vehicle.brand} ${vehicle.model}</strong> ?<h3>`
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(!result) return;

      this.vehiclesService.deleteVehicle(vehicle.id).subscribe({
        next: () => {
          this.snackbarService.showMessage('success', "Pomyślnie usunięto pojazd");
          this.dataSource.deleteVehicle(vehicle.id);
        },
        error: () => {
          this.snackbarService.showMessage('error', "Problem z usunięciem pojazdu");
        }
      })
    })
    
  }

}
