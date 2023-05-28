import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductProfileEditRoutingModule } from './product-profile-edit-routing.module';
import { ProductProfileEditComponent } from './product-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CustomHeaderModule } from 'src/app/shared/ui/custom-header/custom-header.module';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';

@NgModule({
  declarations: [ProductProfileEditComponent],
  imports: [
    CommonModule,
    ProductProfileEditRoutingModule,
    MatButtonModule,
    TextInputModule,
    ReactiveFormsModule,
    CustomHeaderModule
  ]
})
export class ProductProfileEditModule {}
