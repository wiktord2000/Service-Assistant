import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderDialogComponent } from './create-order-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomHeaderModule } from '../../custom-header/custom-header.module';
import { ServiceSelectInputModule } from '../../selectors/service-select-input/service-select-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductSelectInputModule } from '../../selectors/product-select-input/product-select-input.module';
import { TextInputModule } from '../../inputs/text-input/text-input.module';
import { OrderProductsTableModule } from '../../tables/order-products-table/order-products-table.module';
import { OrderServicesTableModule } from '../../tables/order-services-table/order-services-table.module';
import { MatSelectModule } from '@angular/material/select';
import { ClientSelectInputModule } from '../../selectors/client-select-input/client-select-input.module';
import { VehicleSelectInputModule } from '../../selectors/vehicle-select-input/vehicle-select-input.module';

@NgModule({
  declarations: [CreateOrderDialogComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatDialogModule,
    CustomHeaderModule,
    ServiceSelectInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ProductSelectInputModule,
    TextInputModule,
    OrderProductsTableModule,
    OrderServicesTableModule,
    MatSelectModule,
    ClientSelectInputModule,
    VehicleSelectInputModule
  ],
  exports: [CreateOrderDialogComponent]
})
export class CreateOrderDialogModule {}
