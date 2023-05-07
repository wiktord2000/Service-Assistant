import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProductsTableComponent } from './order-products-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OrderProductsTableComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule
  ],
  exports: [OrderProductsTableComponent]
})
export class OrderProductsTableModule {}
