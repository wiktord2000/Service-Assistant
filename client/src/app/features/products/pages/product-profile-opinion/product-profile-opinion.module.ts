import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductProfileOpinionRoutingModule } from './product-profile-opinion-routing.module';
import { ProductProfileOpinionComponent } from './product-profile-opinion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CustomHeaderModule } from 'src/app/shared/ui/custom-header/custom-header.module';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';

@NgModule({
  declarations: [ProductProfileOpinionComponent],
  imports: [
    CommonModule,
    ProductProfileOpinionRoutingModule,
    MatButtonModule,
    TextInputModule,
    ReactiveFormsModule,
    CustomHeaderModule
  ]
})
export class ProductProfileOpinionModule {}
