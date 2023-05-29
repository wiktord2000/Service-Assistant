import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductProfileOrdersRoutingModule } from './product-profile-orders-routing.module';
import { ProductProfileOrdersComponent } from './product-profile-orders.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OrdersTableModule } from 'src/app/features/orders/ui/orders-table/orders-table.module';
import { TableBaseDirectiveModule } from 'src/app/shared/ui/directives/table-base/table-base-directive.module';

@NgModule({
  declarations: [ProductProfileOrdersComponent],
  imports: [
    CommonModule,
    ProductProfileOrdersRoutingModule,
    MatSlideToggleModule,
    OrdersTableModule,
    TableBaseDirectiveModule
  ]
})
export class ProductProfileOrdersModule {}
