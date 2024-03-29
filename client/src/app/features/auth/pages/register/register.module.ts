import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { PasswordInputModule } from '../../../../shared/ui/inputs/password-input/password-input.module';
import { TextInputModule } from '../../../../shared/ui/inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    PasswordInputModule,
    TextInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class RegisterModule {}
