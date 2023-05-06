import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { SendEmailLinkModule } from 'src/app/shared/components/links/send-email-link/send-email-link.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { VehiclesTableModule } from 'src/app/vehicles/ui/vehicles-table/vehicles-table.module';
import { OrdersTableModule } from 'src/app/orders/ui/orders-table/orders-table.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextInputModule } from 'src/app/shared/components/inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientProfileRoutingModule } from './client-profile-routing.module';

@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    CommonModule,
    ClientProfileRoutingModule,
    MatIconModule,
    SendEmailLinkModule,
    MatTabsModule,
    MatButtonModule,
    VehiclesTableModule,
    OrdersTableModule,
    MatSlideToggleModule,
    TextInputModule,
    ReactiveFormsModule
  ],
  exports: [ClientProfileComponent]
})
export class ClientProfileModule {}
