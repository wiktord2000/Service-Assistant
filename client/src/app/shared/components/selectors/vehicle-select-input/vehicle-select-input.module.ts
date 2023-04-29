import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleSelectInputComponent } from './vehicle-select-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [VehicleSelectInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  exports: [VehicleSelectInputComponent]
})
export class VehicleSelectInputModule {}
