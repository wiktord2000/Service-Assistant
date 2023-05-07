import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAndTimePickerComponent } from './date-and-time-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DateAndTimePickerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    MatButtonModule
  ],
  exports: [DateAndTimePickerComponent]
})
export class DateAndTimePickerModule {}
