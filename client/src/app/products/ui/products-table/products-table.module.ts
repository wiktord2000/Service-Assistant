import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductsTableComponent } from './products-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductProfileLinkModule } from '../../../shared/components/links/product-profile-link/product-profile-link.module';

@NgModule({
  declarations: [ProductsTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ProductProfileLinkModule
  ],
  exports: [ProductsTableComponent]
})
export class ProductsTableModule {}
