import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesTableComponent } from './vehicles-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VehicleProfileLinkModule } from '../../../shared/ui/links/vehicle-profile-link/vehicle-profile-link.module';

@NgModule({
  declarations: [VehiclesTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    VehicleProfileLinkModule
  ],
  exports: [VehiclesTableComponent]
})
export class VehiclesTableModule {}
