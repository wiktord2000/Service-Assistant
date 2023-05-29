import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleProfileOrdersRoutingModule } from './vehicle-profile-orders-routing.module';
import { VehicleProfileOrdersComponent } from './vehicle-profile-orders.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateOrderDialogModule } from 'src/app/features/orders/ui/create-order-dialog/create-order-dialog.module';
import { OrdersTableModule } from 'src/app/features/orders/ui/orders-table/orders-table.module';
import { TableBaseDirectiveModule } from 'src/app/shared/ui/directives/table-base/table-base-directive.module';

@NgModule({
  declarations: [VehicleProfileOrdersComponent],
  imports: [
    CommonModule,
    VehicleProfileOrdersRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    OrdersTableModule,
    CreateOrderDialogModule,
    TableBaseDirectiveModule
  ]
})
export class VehicleProfileOrdersModule {}
