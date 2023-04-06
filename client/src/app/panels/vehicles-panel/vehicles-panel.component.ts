import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { SnackbarService } from 'src/app/core/services/ui/snackbar.service';
import { VehiclesService } from 'src/app/core/services/http/vehicles.service';
import { CreateVehicleDialogComponent } from 'src/app/shared/dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { VehiclesTableComponent } from 'src/app/shared/tables/vehicles-table/vehicles-table.component';

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
