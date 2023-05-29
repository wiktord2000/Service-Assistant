import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileVehiclesRoutingModule } from './client-profile-vehicles-routing.module';
import { ClientProfileVehiclesComponent } from './client-profile-vehicles.component';
import { VehiclesTableModule } from 'src/app/features/vehicles/ui/vehicles-table/vehicles-table.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateVehicleDialogModule } from 'src/app/features/vehicles/ui/create-vehicle-dialog/create-vehicle-dialog.module';
import { TableBaseDirectiveModule } from 'src/app/shared/ui/directives/table-base/table-base-directive.module';

@NgModule({
  declarations: [ClientProfileVehiclesComponent],
  imports: [
    CommonModule,
    ClientProfileVehiclesRoutingModule,
    VehiclesTableModule,
    CreateVehicleDialogModule,
    MatIconModule,
    MatButtonModule,
    TableBaseDirectiveModule
  ]
})
export class ClientProfileVehiclesModule {}
