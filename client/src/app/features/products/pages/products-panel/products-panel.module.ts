import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPanelComponent } from './products-panel.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ProductsTableModule } from 'src/app/features/products/ui/products-table/products-table.module';
import { MatIconModule } from '@angular/material/icon';
import { ProductsPanelRoutingModule } from './products-panel-routing.module';
import { CreateProductDialogModule } from '../../ui/create-product-dialog/create-product-dialog.module';
import { ProductDeliveryDialogModule } from '../../ui/product-delivery-dialog/product-delivery-dialog.module';
import { TableBaseDirectiveModule } from 'src/app/shared/ui/directives/table-base/table-base-directive.module';

@NgModule({
  declarations: [ProductsPanelComponent],
  imports: [
    CommonModule,
    ProductsPanelRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ProductsTableModule,
    CreateProductDialogModule,
    ProductDeliveryDialogModule,
    TableBaseDirectiveModule
  ]
})
export class ProductsPanelModule {}
