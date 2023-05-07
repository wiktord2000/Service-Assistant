import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClientProfileLinkModule } from 'src/app/shared/ui/links/client-profile-link/client-profile-link.module';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';
import { ClientSelectInputModule } from 'src/app/shared/ui/selectors/client-select-input/client-select-input.module';
import { DateInputModule } from 'src/app/shared/ui/inputs/date-input/date-input.module';
import { OrdersTableModule } from 'src/app/orders/ui/orders-table/orders-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleProfileComponent } from './vehicle-profile.component';
import { VehicleProfileRoutingModule } from './vehicle-profile-routing.module';
import { CreateOrderDialogModule } from 'src/app/orders/ui/create-order-dialog/create-order-dialog.module';

@NgModule({
  declarations: [VehicleProfileComponent],
  imports: [
    CommonModule,
    VehicleProfileRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSlideToggleModule,
    ClientProfileLinkModule,
    TextInputModule,
    ClientSelectInputModule,
    DateInputModule,
    OrdersTableModule,
    ReactiveFormsModule,
    CreateOrderDialogModule
  ]
})
export class VehicleProfileModule {}
