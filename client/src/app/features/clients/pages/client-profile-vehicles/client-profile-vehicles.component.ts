import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/core/models/Client';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { CreateVehicleDialogComponent } from 'src/app/features/vehicles/ui/create-vehicle-dialog/create-vehicle-dialog.component';
import { VehiclesTableComponent } from 'src/app/features/vehicles/ui/vehicles-table/vehicles-table.component';
import { ClientProfileComponent } from '../client-profile/client-profile.component';
import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';

@Component({
  selector: 'app-client-profile-vehicles',
  templateUrl: './client-profile-vehicles.component.html',
  styleUrls: ['./client-profile-vehicles.component.scss']
})
export class ClientProfileVehiclesComponent implements OnInit {
  @ViewChild(VehiclesTableComponent) vehiclesTable: VehiclesTableComponent;
  client: Client;
  constructor(
    private dialog: MatDialog,
    @SkipSelf() private clientProfile: ClientProfileComponent
  ) {}

  ngOnInit(): void {
    this.client = this.clientProfile.client;
  }

  onAddVehicle() {
    const dialogRef = this.dialog.open(CreateVehicleDialogComponent, {
      width: '900px',
      data: { client: this.client }
    });

    dialogRef.afterClosed().subscribe((vehicle: Vehicle) => {
      if (vehicle) this.vehiclesTable.dataSource.addVehicle(vehicle);
    });
  }
}
