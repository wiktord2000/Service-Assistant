import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SelectInputComponent } from './select-input.component';

@NgModule({
  declarations: [SelectInputComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule],
  exports: [CommonModule, SelectInputComponent]
})
export class SelectInputModule {}
