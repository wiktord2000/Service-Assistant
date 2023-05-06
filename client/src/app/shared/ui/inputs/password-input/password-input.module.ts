import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PasswordInputComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule],
  exports: [PasswordInputComponent]
})
export class PasswordInputModule {}
