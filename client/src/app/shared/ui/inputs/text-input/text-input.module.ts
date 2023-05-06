import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [TextInputComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  exports: [TextInputComponent]
})
export class TextInputModule {}
