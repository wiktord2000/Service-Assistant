import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleProfileEditRoutingModule } from './vehicle-profile-edit-routing.module';
import { VehicleProfileEditComponent } from './vehicle-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateInputModule } from 'src/app/shared/ui/inputs/date-input/date-input.module';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';
import { ClientSelectInputModule } from 'src/app/shared/ui/selectors/client-select-input/client-select-input.module';

@NgModule({
  declarations: [VehicleProfileEditComponent],
  imports: [
    CommonModule,
    VehicleProfileEditRoutingModule,
    MatButtonModule,
    TextInputModule,
    ClientSelectInputModule,
    DateInputModule,
    ReactiveFormsModule
  ]
})
export class VehicleProfileEditModule {}
