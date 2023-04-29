import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPanelComponent } from './products-panel.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ProductsTableModule } from 'src/app/shared/components/tables/products-table/products-table.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProductsPanelComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ProductsTableModule
  ],
  exports: [ProductsPanelComponent]
})
export class ProductsPanelModule {}
