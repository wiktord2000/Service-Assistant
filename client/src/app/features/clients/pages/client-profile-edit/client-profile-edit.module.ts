import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileEditRoutingModule } from './client-profile-edit-routing.module';
import { ClientProfileEditComponent } from './client-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';

@NgModule({
  declarations: [ClientProfileEditComponent],
  imports: [
    CommonModule,
    ClientProfileEditRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    TextInputModule
  ]
})
export class ClientProfileEditModule {}
