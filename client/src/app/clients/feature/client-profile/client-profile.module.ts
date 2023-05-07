import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { SendEmailLinkModule } from 'src/app/shared/ui/links/send-email-link/send-email-link.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { VehiclesTableModule } from 'src/app/vehicles/ui/vehicles-table/vehicles-table.module';
import { OrdersTableModule } from 'src/app/orders/ui/orders-table/orders-table.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientProfileRoutingModule } from './client-profile-routing.module';
import { CreateVehicleDialogModule } from 'src/app/vehicles/ui/create-vehicle-dialog/create-vehicle-dialog.module';
import { CreateOrderDialogModule } from 'src/app/orders/ui/create-order-dialog/create-order-dialog.module';

@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientProfileRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSlideToggleModule,
    TextInputModule,
    SendEmailLinkModule,
    VehiclesTableModule,
    OrdersTableModule,
    CreateVehicleDialogModule,
    CreateOrderDialogModule
  ]
})
export class ClientProfileModule {}
