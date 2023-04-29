import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleProfileComponent } from './vehicle-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClientProfileLinkModule } from 'src/app/shared/components/links/client-profile-link/client-profile-link.module';
import { TextInputModule } from 'src/app/shared/components/inputs/text-input/text-input.module';
import { ClientSelectInputModule } from 'src/app/shared/components/selectors/client-select-input/client-select-input.module';
import { DateInputModule } from 'src/app/shared/components/inputs/date-input/date-input.module';
import { OrdersTableModule } from 'src/app/shared/components/tables/orders-table/orders-table.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VehicleProfileComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSlideToggleModule,
    ClientProfileLinkModule,
    TextInputModule,
    ClientSelectInputModule,
    DateInputModule,
    OrdersTableModule,
    ReactiveFormsModule
  ],
  exports: [VehicleProfileComponent]
})
export class VehicleProfileModule {}
