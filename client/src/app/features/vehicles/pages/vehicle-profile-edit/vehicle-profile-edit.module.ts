import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleProfileEditRoutingModule } from './vehicle-profile-edit-routing.module';
import { VehicleProfileEditComponent } from './vehicle-profile-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { VehicleFormModule } from '../../ui/vehicle-form/vehicle-form.module';

@NgModule({
  declarations: [VehicleProfileEditComponent],
  imports: [CommonModule, VehicleProfileEditRoutingModule, MatButtonModule, VehicleFormModule]
})
export class VehicleProfileEditModule {}
