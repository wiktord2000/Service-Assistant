import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductsTableComponent } from './products-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductProfileLinkModule } from '../../../../shared/ui/links/product-profile-link/product-profile-link.module';
import { MatMenuModule } from '@angular/material/menu';
import { TruncateTextPipeModule } from 'src/app/shared/ui/pipes/truncate-text-pipe/truncate-text-pipe.module';

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
    ProductProfileLinkModule,
    MatMenuModule,
    TruncateTextPipeModule
  ],
  exports: [ProductsTableComponent]
})
export class ProductsTableModule {}
