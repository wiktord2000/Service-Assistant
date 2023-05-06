import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAndTimeInputComponent } from './date-and-time-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [DateAndTimeInputComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    MatInputModule,
    MatMomentDateModule // or MatNativeDateModule (to check whether this prompt to errors)
  ],
  exports: [DateAndTimeInputComponent]
})
export class DateAndTimeInputModule {}
