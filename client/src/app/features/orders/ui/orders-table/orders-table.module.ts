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
import { StatusSelectorModule } from '../status-selector/status-selector.module';
import { ClientProfileLinkModule } from '../../../../shared/ui/links/client-profile-link/client-profile-link.module';
import { VehicleProfileLinkModule } from '../../../../shared/ui/links/vehicle-profile-link/vehicle-profile-link.module';
import { OrderProfileLinkModule } from 'src/app/shared/ui/links/order-profile-link/order-profile-link.module';
import { DateAndTimeInputModule } from 'src/app/shared/ui/inputs/date-and-time-input/date-and-time-input.module';

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
    DateAndTimeInputModule,
    OrderProfileLinkModule
  ],
  exports: [OrdersTableComponent]
})
export class OrdersTableModule {}
