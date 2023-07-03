import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from './vehicle-form.component';

@NgModule({
  declarations: [VehicleFormComponent],
  imports: [CommonModule],
  exports: [VehicleFormComponent]
})
export class VehicleFormModule {}
