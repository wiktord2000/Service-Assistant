import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { PasswordInputModule } from '../shared/inputs/password-input/password-input.module';
import { TextInputModule } from '../shared/inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    PasswordInputModule,
    TextInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [RegisterComponent]
})
export class RegisterModule {}
