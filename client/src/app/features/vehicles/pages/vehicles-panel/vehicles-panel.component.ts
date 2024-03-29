import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { VehiclesService } from 'src/app/features/vehicles/data-access/vehicles.service';
import { CreateVehicleDialogComponent } from 'src/app/features/vehicles/ui/create-vehicle-dialog/create-vehicle-dialog.component';
import { VehiclesTableComponent } from 'src/app/features/vehicles/ui/vehicles-table/vehicles-table.component';

@Component({
  selector: 'app-vehicles-panel',
  templateUrl: './vehicles-panel.component.html',
  styleUrls: ['./vehicles-panel.component.scss']
})
export class VehiclesPanelComponent implements OnInit {
  @ViewChild(VehiclesTableComponent) vehiclesTable!: VehiclesTableComponent;

  constructor(
    public snackbarService: SnackbarService,
    public dialog: MatDialog,
    public vehiclesService: VehiclesService
  ) {}
  ngAfterViewInit(): void {
    this.vehiclesTable.dataSource.loadVehicles();
  }

  ngOnInit(): void {}

  onAddVehicle() {
    const dialogRef = this.dialog.open(CreateVehicleDialogComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe((vehicle: Vehicle) => {
      if (vehicle !== undefined) this.vehiclesTable.dataSource.addVehicle(vehicle);
    });
  }
}
