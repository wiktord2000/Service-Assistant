import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesPanelComponent } from './vehicles-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { VehiclesTableModule } from 'src/app/shared/components/tables/vehicles-table/vehicles-table.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [VehiclesPanelComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, VehiclesTableModule],
  exports: [VehiclesPanelComponent]
})
export class VehiclesPanelModule {}
