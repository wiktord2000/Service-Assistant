import { Vehicle } from '../../../../core/models/Vehicle';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { VehiclesService } from 'src/app/features/vehicles/data-access/vehicles.service';
import { VehiclesTableDataSource } from './vehicles-table-datasource';
import { ConfirmDialogComponent } from '../../../../shared/ui/confirm-dialog/confirm-dialog.component';
import { UtilsService } from 'src/app/shared/utils/utils.service';

const COMPLETE_COLUMN_LIST = [
  'vehicleName',
  'registrationNumber',
  'vin',
  'currentOwner',
  'productionDate',
  'capacity',
  'engineFuel',
  'enginePower',
  'actions'
];

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss']
})
export class VehiclesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vehicle>;
  @Input() initialData?: Vehicle[];
  @Input() hideCurrentOwnerColumn?: boolean = false;
  @Input() matElevationValue?: number = 8;
  @Input() heightInRows?: number = 8;
  tableHeight!: number;
  dataSource: VehiclesTableDataSource;
  displayedColumns = COMPLETE_COLUMN_LIST;

  constructor(
    public vehiclesService: VehiclesService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new VehiclesTableDataSource(this.vehiclesService, this.initialData);
    this.displayedColumns = this.displayedColumns.filter(
      (column) => !(column === 'currentOwner' && this.hideCurrentOwnerColumn)
    );
    this.tableHeight = this.utils.calculateTableHeight(this.heightInRows);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDeleteClick(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        headerText: 'Usuwanie pojazdu',
        bodyText: `<h3>Czy na pewno chcesz usunąć pojazd <strong>${vehicle.brand} ${vehicle.model}</strong> ?<h3>`
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.vehiclesService.deleteVehicle(vehicle.id).subscribe({
        next: () => {
          this.snackbarService.showMessage('success', 'Pomyślnie usunięto pojazd');
          this.dataSource.deleteVehicle(vehicle.id);
        },
        error: ({ error }) => {
          this.snackbarService.showMessage('error', error);
        }
      });
    });
  }
}
