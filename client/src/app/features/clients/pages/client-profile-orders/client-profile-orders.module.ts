import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileOrdersRoutingModule } from './client-profile-orders-routing.module';
import { ClientProfileOrdersComponent } from './client-profile-orders.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OrdersTableModule } from 'src/app/features/orders/ui/orders-table/orders-table.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ClientProfileOrdersComponent],
  imports: [
    CommonModule,
    ClientProfileOrdersRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    OrdersTableModule
  ]
})
export class ClientProfileOrdersModule {}
