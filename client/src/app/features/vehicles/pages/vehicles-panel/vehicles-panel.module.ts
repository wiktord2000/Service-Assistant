import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesPanelComponent } from './vehicles-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { VehiclesTableModule } from 'src/app/features/vehicles/ui/vehicles-table/vehicles-table.module';
import { MatButtonModule } from '@angular/material/button';
import { VehiclesPanelRoutingModule } from './vehicles-panel-routing.module';
import { CreateVehicleDialogModule } from '../../ui/create-vehicle-dialog/create-vehicle-dialog.module';
import { TableBaseDirectiveModule } from 'src/app/shared/ui/directives/table-base/table-base-directive.module';

@NgModule({
  declarations: [VehiclesPanelComponent],
  imports: [
    CommonModule,
    VehiclesPanelRoutingModule,
    MatIconModule,
    MatButtonModule,
    VehiclesTableModule,
    CreateVehicleDialogModule,
    TableBaseDirectiveModule
  ]
})
export class VehiclesPanelModule {}
