import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderProfileBasketRoutingModule } from './order-profile-basket-routing.module';
import { OrderProfileBasketComponent } from './order-profile-basket.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CustomHeaderModule } from 'src/app/shared/ui/custom-header/custom-header.module';
import { TableBaseDirectiveModule } from 'src/app/shared/ui/directives/table-base-directive/table-base-directive.module';
import { TextInputModule } from 'src/app/shared/ui/inputs/text-input/text-input.module';
import { OrderProductsTableModule } from '../../ui/order-products-table/order-products-table.module';
import { OrderServicesTableModule } from '../../ui/order-services-table/order-services-table.module';

@NgModule({
  declarations: [OrderProfileBasketComponent],
  imports: [
    CommonModule,
    OrderProfileBasketRoutingModule,
    MatDividerModule,
    MatButtonModule,
    CustomHeaderModule,
    TextInputModule,
    MatIconModule,
    OrderProductsTableModule,
    OrderServicesTableModule,
    TableBaseDirectiveModule
  ]
})
export class OrderProfileBasketModule {}
