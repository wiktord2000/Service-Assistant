import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSelectInputComponent } from './product-select-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductSelectInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ProductSelectInputComponent]
})
export class ProductSelectInputModule {}
