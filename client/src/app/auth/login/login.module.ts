import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { PasswordInputModule } from '../../shared/ui/inputs/password-input/password-input.module';
import { TextInputModule } from '../../shared/ui/inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PasswordInputModule,
    TextInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [LoginComponent]
})
export class LoginModule {}
