import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomHeaderModule } from 'src/app/shared/ui/custom-header/custom-header.module';
import { OrdersTableModule } from 'src/app/orders/ui/orders-table/orders-table.module';
import { ProductProfileRoutingModule } from './product-profile-routing.module';
import { ProductProfileComponent } from './product-profile.component';

@NgModule({
  declarations: [ProductProfileComponent],
  imports: [
    CommonModule,
    ProductProfileRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSlideToggleModule,
    TextInputModule,
    ReactiveFormsModule,
    CustomHeaderModule,
    OrdersTableModule
  ],
  exports: [ProductProfileComponent]
})
export class ProductProfileModule {}
