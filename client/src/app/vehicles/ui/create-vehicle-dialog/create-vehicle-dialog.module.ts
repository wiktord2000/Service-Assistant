import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateVehicleDialogComponent } from './create-vehicle-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { TextInputModule } from '../../../shared/components/inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ClientSelectInputModule } from '../../../shared/components/selectors/client-select-input/client-select-input.module';
import { DateInputModule } from '../../../shared/components/inputs/date-input/date-input.module';

@NgModule({
  declarations: [CreateVehicleDialogComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    TextInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    ClientSelectInputModule,
    DateInputModule
  ],
  exports: [CreateVehicleDialogComponent]
})
export class CreateVehicleDialogModule {}
