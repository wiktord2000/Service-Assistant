import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from './vehicle-form.component';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DateInputModule } from 'src/app/shared/ui/inputs/date-input/date-input.module';
import { ClientSelectInputModule } from 'src/app/shared/ui/selectors/client-select-input/client-select-input.module';

@NgModule({
  declarations: [VehicleFormComponent],
  imports: [
    CommonModule,
    TextInputModule,
    ClientSelectInputModule,
    DateInputModule,
    ReactiveFormsModule
  ],
  exports: [VehicleFormComponent]
})
export class VehicleFormModule {}
