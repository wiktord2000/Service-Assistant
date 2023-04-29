import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersTableComponent } from './orders-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { StatusSelectorModule } from '../../selectors/status-selector/status-selector.module';
import { ClientProfileLinkModule } from '../../links/client-profile-link/client-profile-link.module';
import { VehicleProfileLinkModule } from '../../links/vehicle-profile-link/vehicle-profile-link.module';
import { DateAndTimePickerModule } from '../../date-and-time-picker/date-and-time-picker.module';

@NgModule({
  declarations: [OrdersTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    RouterModule,
    StatusSelectorModule,
    ClientProfileLinkModule,
    VehicleProfileLinkModule,
    DateAndTimePickerModule
  ],
  exports: [OrdersTableComponent]
})
export class OrdersTableModule {}
