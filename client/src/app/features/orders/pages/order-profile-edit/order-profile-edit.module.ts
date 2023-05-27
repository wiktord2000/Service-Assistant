import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderProfileEditRoutingModule } from './order-profile-edit-routing.module';
import { OrderProfileEditComponent } from './order-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CustomHeaderModule } from 'src/app/shared/ui/custom-header/custom-header.module';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';
import { DateAndTimeInputModule } from 'src/app/shared/ui/inputs/date-and-time-input/date-and-time-input.module';
import { ClientSelectInputModule } from 'src/app/shared/ui/selectors/client-select-input/client-select-input.module';
import { VehicleSelectInputModule } from 'src/app/shared/ui/selectors/vehicle-select-input/vehicle-select-input.module';
import { SelectInputModule } from 'src/app/shared/ui/inputs/select-input/select-input.module';

@NgModule({
  declarations: [OrderProfileEditComponent],
  imports: [
    CommonModule,
    OrderProfileEditRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    CustomHeaderModule,
    TextInputModule,
    DateAndTimeInputModule,
    ClientSelectInputModule,
    VehicleSelectInputModule,
    SelectInputModule
  ]
})
export class OrderProfileEditModule {}
